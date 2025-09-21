import { type Family, type SimpleMonsterWithVariants } from "../../types/monsters.ts";
import { findFamilyIndex } from "../helpers/findFamilyIndex.ts";
import { emptyMonsterWithVariants } from "../helpers/sortByElement.ts"; 


export function mergeFamilies(familiesIdToMerge: number[], allMonsters: Family[]) : Family[] {
    if (familiesIdToMerge.length !== 2) return allMonsters;

    const index1 = findFamilyIndex(allMonsters, familiesIdToMerge[0])
    const index2 = findFamilyIndex(allMonsters, familiesIdToMerge[1])

    const mergedFamily = mergeFamiliesMonsters(allMonsters[index1], allMonsters[index2]);

    allMonsters.splice(Math.max(index1, index2), 1);
    allMonsters.splice(Math.min(index1, index2), 1);

    allMonsters.push(mergedFamily);
    return allMonsters;
}

function mergeFamiliesMonsters(fam1: Family, fam2: Family): Family {
  const mergedMonsters: SimpleMonsterWithVariants[] = [];

  // On suppose que les deux familles ont le même nombre d’éléments (Water, Fire, Wind, Light, Dark)
  const count = Math.max(fam1.monsters.length, fam2.monsters.length);

  for (let i = 0; i < count; i++) {
    const m1 = fam1.monsters[i];
    const m2 = fam2.monsters[i];

    // On prend le monstre valide de fam1 sinon celui de fam2 sinon un "empty"
    const mergedMonster: SimpleMonsterWithVariants = m1 && m1.variants[0].id !== -1
      ? m1
      : m2 && m2.variants[0].id !== -1
      ? m2
      : emptyMonsterWithVariants;

    mergedMonsters.push(mergedMonster);
  }

  return {
    family_id: fam1.family_id,
    family_name: fam1.family_name + "-" + fam2.family_name,
    isSecondAwakedFamily: fam1.isSecondAwakedFamily || fam2.isSecondAwakedFamily,
    isCollaboredFamily: fam1.isCollaboredFamily || fam2.isCollaboredFamily,
    isMergedFamily: true,
    monsters: mergedMonsters,
  };
}