import { SimpleMonster } from "../../types/monsters.js";
import { emptyMonster } from "../helpers/sortByElement.js";


export function mergeFamilies(familiesIdToMerge: number[], allMonsters: SimpleMonster[][]) : SimpleMonster[][] {
    if (familiesIdToMerge.length !== 2) return allMonsters;

    const index1 = allMonsters.findIndex(fam => {
        const valid = fam.find(m => m.family_id != -1)
        return valid?.family_id === familiesIdToMerge[0]
    })

    const index2 = allMonsters.findIndex(fam => {
        const valid = fam.find(m => m.family_id != -1)
        return valid?.family_id === familiesIdToMerge[1]
    })

    const mergedFamily = merge(allMonsters[index1], allMonsters[index2]);

    // Remove the old families
    allMonsters.splice(Math.max(index1, index2), 1);
    allMonsters.splice(Math.min(index1, index2), 1);

    // Add the merged family
    allMonsters.push(mergedFamily);

    return allMonsters;
}

function merge(family1: SimpleMonster[], family2: SimpleMonster[]) {
    const merged: SimpleMonster[] = [];

  for (let i = 0; i < 5; i++) {
    const m1 = family1[i];
    const m2 = family2[i];

    if (m1 && m1.name !== "???") {
      merged.push(m1);
    } else if (m2 && m2.name !== "???") {
      merged.push(m2);
    } else {
      merged.push(emptyMonster);
    }
  }

  return merged;
}