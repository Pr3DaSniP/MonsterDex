import { ref } from 'vue'
import { decode } from '@msgpack/msgpack'
import type { BackgroundMonsterImg } from '@/types/monsters'

// Cache des sélections aléatoires par "clé"
const monstersCache = ref<Record<string, BackgroundMonsterImg[]>>({})

// Loading state
const loading = ref(true)

// Liste complète des monstres en mémoire (chargée 1 seule fois)
let allMonsters: BackgroundMonsterImg[] | null = null

function pickRandomValidMonsters(arr: BackgroundMonsterImg[], n: number): BackgroundMonsterImg[] {
  const validMonsters = arr.filter((m) => m.image_filename != null)
  const result: BackgroundMonsterImg[] = []
  const taken = new Set<number>()

  while (result.length < n && taken.size < validMonsters.length) {
    const index = Math.floor(Math.random() * validMonsters.length)
    if (!taken.has(index)) {
      result.push(validMonsters[index])
      taken.add(index)
    }
  }
  return result
}

export function useBackgroundMonsters() {
  async function loadMonsters(key: number, count = 20): Promise<BackgroundMonsterImg[]> {
    // Charge la liste complète 1 seule fois
    if (!allMonsters) {
      try {
        const res = await fetch('/data/all_monsters_images.msgpack')
        const buffer = await res.arrayBuffer()
        allMonsters = decode(new Uint8Array(buffer)) as BackgroundMonsterImg[]
      } catch (e) {
        console.error('Erreur de chargement:', e)
        allMonsters = []
      } finally {
        loading.value = false;
      }
    }

    // Si la sélection n’existe pas encore → on la crée
    if (!monstersCache.value[key]) {
      monstersCache.value[key] = pickRandomValidMonsters(allMonsters!, count)
    }

    return monstersCache.value[key]
  }

  return { loadMonsters, loading }
}
