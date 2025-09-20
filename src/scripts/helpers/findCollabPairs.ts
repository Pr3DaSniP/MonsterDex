import { Family, SimpleMonster } from '../../types/monsters'
import { collabWhiteList } from '../knownCollabFamiliesIds'

// Construire un set pour lookup rapide
const collabFamilyIds = new Set(collabWhiteList.flatMap((c) => c.families))


export function findCollabPairs(families: Family[]) {
  const bySkillGroup = new Map<number, number[]>();

  for (const family of families) {
    // Prendre le premier monstre valide
    const firstMonster = family.monsters.find((m) => m.variants[0]?.id !== -1);
    if (!firstMonster) continue;

    const sgid = firstMonster.skill_group_id;
    const fid = family.family_id;
    if (!sgid || !fid) continue;

    if (!bySkillGroup.has(sgid)) bySkillGroup.set(sgid, []);
    const existing = bySkillGroup.get(sgid)!;

    if (!existing.includes(fid)) existing.push(fid);
  }

  // On garde seulement les skill_group_id qui contiennent au moins une famille whitelistée
  const collabs: { skill_group_id: number; families: number[] }[] = [];
  for (const [sgid, fams] of bySkillGroup.entries()) {
    if (fams.some((fid) => collabFamilyIds.has(fid))) {
      collabs.push({ skill_group_id: sgid, families: fams });
    }
  }

  return collabs;
}