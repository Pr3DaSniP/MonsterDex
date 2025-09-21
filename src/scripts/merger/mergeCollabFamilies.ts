import { SimpleMonsterWithVariants, type Family } from '../../types/monsters'
import { findFamilyIndex } from '../helpers/findFamilyIndex'

export function mergeCollabFamilies(
  familyIds: number[],
  allMonsters: Family[],
): Family[] {
  if (familyIds.length !== 2) return allMonsters; // Need exactly 2 families

  const index1 = findFamilyIndex(allMonsters, familyIds[0]);
  const index2 = findFamilyIndex(allMonsters, familyIds[1]);

  if (index1 === -1 || index2 === -1) {
    console.warn(`❌ One of the families to merge not found: ${familyIds}`);
    return allMonsters;
  }

  const fam1 = allMonsters[index1];
  const fam2 = allMonsters[index2];

  const dualFamily: SimpleMonsterWithVariants[] = [];

  for (let i = 0; i < 5; i++) {
    const m1 = fam1.monsters[i];
    const m2 = fam2.monsters[i];

    if (!m1 || !m2) continue; // skip si une des variantes est absente

    const dual: SimpleMonsterWithVariants = {
      element: m1.element,
      natural_stars: m1.natural_stars,
      skill_group_id: m1.skill_group_id,
      owned: m1.owned || m2.owned,
      full_skill: m1.owned || m2.full_skill,
      skill_ups_to_max: m1.skill_ups_to_max || m2.skill_ups_to_max,
      variants: [
        ...m1.variants,
        ...m2.variants,
      ],
    };

    dualFamily.push(dual);
  }

  const mergedFamily: Family = {
    family_id: familyIds[0], // tu peux choisir lequel garder
    family_name: `${fam1.family_name} x ${fam2.family_name}`,
    isSecondAwakedFamily: false,
    isCollaboredFamily: true,
    isMergedFamily: false,
    monsters: dualFamily,
  };

  // Supprimer les anciennes familles
  allMonsters.splice(Math.max(index1, index2), 1);
  allMonsters.splice(Math.min(index1, index2), 1);

  // Ajouter la nouvelle famille fusionnée
  allMonsters.push(mergedFamily);

  console.log(`✅ Collab merged: ${fam1.family_name} & ${fam2.family_name}`);

  return allMonsters;
}
