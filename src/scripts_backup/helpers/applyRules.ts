import { MonsterRule, SimpleMonster } from '../../types/monsters.js'
import { fetchSecondAwakenedFamiliesIds } from '../fetchers/fetchSecondAwakenedFamiliesIds.js'
import { mergeFamilies } from '../merger/mergeFamiliesFromFile.js'
import { fetchMonstersByFamily } from '../fetchers/fetchMonstersByFamily.js'
import { findCollabPairs } from './findCollabPairs.js'
import { mergeCollabFamilies } from '../merger/mergeCollabFamilies.js'

export async function applyRules(
  rules: MonsterRule[],
  allMonsters: SimpleMonster[][],
): Promise<SimpleMonster[][]> {
  for (const rule of rules) {
    switch (rule.type) {
      case 'merge':
        allMonsters = mergeFamilies(rule.families, allMonsters)
        break
      case 'cmd':
        for (const cmd of rule.commands) {
          switch (cmd) {
            case 'fetch_2a':
              const ids = await fetchSecondAwakenedFamiliesIds()
              for (const id of ids) {
                const index = allMonsters.findIndex((fam) => {
                  const valid = fam.find((m) => m.family_id != -1)
                  return valid?.family_id === id
                })
                // Remove the family if found
                if (index !== -1) {
                  allMonsters.splice(index, 1)
                }
                // Fetch and add the 2a family
                const secondAwakenedFamily = await fetchMonstersByFamily(id, {
                  family_id: id,
                  awaken_level: 2, // Filtre pour les monstres éveillés
                  obtainable: true, // Filtre pour les monstres obtenables
                })
                allMonsters.push(secondAwakenedFamily)
              }
              break
            case 'collab':
              const pairs = findCollabPairs(allMonsters)
              console.table(pairs)
              for (const pair of pairs) {
                allMonsters = mergeCollabFamilies(pair.families, allMonsters)
              }
              break
          }
        }
        break
    }
  }
  return allMonsters
}
