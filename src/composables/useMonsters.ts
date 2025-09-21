import type { Family, SavedMonster } from '@/types/monsters'
import { onMounted, ref } from 'vue'
import { useNotifications } from './useNotifications'
import { decode } from '@msgpack/msgpack'
import type { FileType } from '@/types/file.ts'

// Loading state
const loading = ref(true)

const families = ref<Family[]>([])

export function useMonsters() {
  const { addNotification } = useNotifications()

  onMounted(loadAllMonsters)

  async function loadAllMonsters() {
    try {
      const res = await fetch('/data/all_monsters.msgpack')
      const buffer = await res.arrayBuffer()
      families.value = decode(new Uint8Array(buffer)) as Family[]
    } catch (err) {
      throw new Error(`❌ Erreur de chargement monstres: ${err}`)
    } finally {
      loading.value = false
    }
  }

  function saveMonsterClient() {
    try {
      const monstersToSave: SavedMonster[] = families.value.flatMap((family) =>
        family.monsters.map((monster) => ({
          owned: monster.owned,
          full_skill: monster.full_skill,
          family_id: family.family_id,
          id: monster.variants[0].id,
          com2us_id: monster.variants[0].com2us_id,
        })),
      )

      const dataStr = JSON.stringify(monstersToSave, null, 2)
      const blob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `monsters.json`
      a.click()

      URL.revokeObjectURL(url)
    } catch (error) {
      addNotification('error', 'Erreur', 'Impossible de sauvegarder les monstres.')
    }
  }

  function loadMonsterClient(file: File) {
    loading.value = true
    const reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const text = e.target?.result
        if (typeof text !== 'string') {
          throw new Error("Le contenu lu n'est pas une chaîne de caractères")
        }
        const data = JSON.parse(text)
        const filetype = detectFileType(data)

        switch (filetype) {
          case 'SWEX':
            applySwexData(data)
            addNotification(
              'success',
              'Autofill réussi',
              'Les monstres ont été mis à jour depuis le fichier SWEX.',
            )
            break
          case 'Custom':
            applySavedMonsters(data)
            addNotification(
              'success',
              'Import réussi',
              'Les monstres ont été chargés depuis votre fichier personnalisé.',
            )
            break
          case 'Unknown':
            addNotification(
              'warn',
              'Fichier inconnu',
              'Le type de fichier n’est pas reconnu et n’a pas été importé.',
            )
            break
        }
      } catch (error) {
        addNotification('error', 'Erreur', 'Impossible de lire le fichier JSON.')
      } finally {
        loading.value = false
      }
    }

    reader.readAsText(file)
  }

  function detectFileType(json: any): FileType {
    if (!json || typeof json !== 'object') return 'Unknown'

    if ('wizard_info' in json && 'unit_list' in json && Array.isArray(json.unit_list)) {
      return 'SWEX'
    }

    if (Array.isArray(json)) {
      if (json.length > 0 && 'com2us_id' in json[0] && 'family_id' in json[0]) {
        return 'Custom'
      }
      if (json.length > 0 && 'family_id' in json[0] && 'monsters' in json[0]) {
        return 'Custom'
      }
    }

    return 'Unknown'
  }

  function applySavedMonsters(saved: SavedMonster[]): void {
    saved.forEach((savedMonster) => {
      const family = families.value.find((f) => f.family_id === savedMonster.family_id)
      if (!family) return

      for (const monster of family.monsters) {
        const variant = monster.variants.find(
          (v) => v.id === savedMonster.id || v.com2us_id === savedMonster.com2us_id,
        )
        if (variant) {
          monster.owned = savedMonster.owned
          monster.full_skill = savedMonster.full_skill
          break
        }
      }
    })
  }

  function applySwexData(swex: any): void {
    const ownedSkills = new Map<number, number>()

    for (const unit of swex.unit_list) {
      const totalSkill = getTotalSkill(unit)
      ownedSkills.set(unit.unit_master_id, totalSkill)
    }

    for (const family of families.value) {
      for (const monster of family.monsters) {
        let monsterOwned = false
        let monsterFullSkill = false

        for (const variant of monster.variants) {
          const skillLevel = ownedSkills.get(variant.com2us_id)
          if (skillLevel !== undefined) {
            monsterOwned = true
            if (skillLevel >= monster.skill_ups_to_max) {
              monsterFullSkill = true
            }
          }
        }

        monster.owned = monsterOwned
        monster.full_skill = monsterFullSkill
      }
    }
  }

  function getTotalSkill(unit: any): number {
    return unit.skills
      .map(([, level]: [number, number]) => level - 1)
      .reduce((sum: number, lvl: number) => sum + lvl, 0)
  }

  return {
    families,
    loading,
    loadAllMonsters,
    saveMonsterClient,
    loadMonsterClient
  }
}
