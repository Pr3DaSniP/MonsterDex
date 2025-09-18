import { SimpleMonster } from '../../types/monsters'
import { collabWhiteList } from '../knownCollabFamiliesIds'

// Construire un set pour lookup rapide
const collabFamilyIds = new Set(collabWhiteList.flatMap((c) => c.families))

export function findCollabPairs(families: SimpleMonster[][]) {
  const bySkillGroup = new Map<number, number[]>()

  for (const family of families) {
    const firstMonster = family.find((m) => m.id != -1)
    if (!firstMonster) continue

    const sgid = firstMonster.skill_group_id
    const fid = firstMonster.family_id
    if (!sgid || !fid) continue

    if (!bySkillGroup.has(sgid)) bySkillGroup.set(sgid, [])
    const existing = bySkillGroup.get(sgid)!
    if (!existing.includes(fid)) existing.push(fid)
  }

  // On ne garde que les skill_group_id qui contiennent au moins un collab whitelisté
  const collabs: { skill_group_id: number; families: number[] }[] = []
  for (const [sgid, fams] of bySkillGroup.entries()) {
    if (fams.some((fid) => collabFamilyIds.has(fid))) {
      collabs.push({ skill_group_id: sgid, families: fams })
    }
  }

  return collabs
}
