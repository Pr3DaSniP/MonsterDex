import { type Family, type MonsterRule } from '../../types/monsters.ts'
import { fetchSecondAwakenedFamiliesIds } from '../fetchers/fetchSecondAwakenedFamiliesIds.ts'
import { mergeFamilies } from '../merger/mergeFamiliesFromFile.ts'
import { fetchMonstersByFamily } from '../fetchers/fetchMonstersByFamily.ts'
import { findFamilyIndex } from '../helpers/findFamilyIndex.ts'
import { findCollabPairs } from './findCollabPairs.ts'
import { mergeCollabFamilies } from '../merger/mergeCollabFamilies.ts'

export async function applyRules(rules: MonsterRule[], allMonsters: Family[]): Promise<Family[]> {
  for (const rule of rules) {
    switch (rule.type) {
      case 'merge':
        if (!rule.families || rule.families.length !== 2) {
          console.warn('⚠️ Merge skipped, need exactly 2 family IDs', rule.families)
          break
        }

        allMonsters = mergeFamilies(rule.families, allMonsters)
        console.log(`✅ Merged families: ${rule.families.join(' & ')}`)
        break
      case 'cmd':
        for (const cmd of rule.commands) {
          switch (cmd) {
            case 'fetch_2a':
              const ids = await fetchSecondAwakenedFamiliesIds()
              for (const id of ids) {
                const index = findFamilyIndex(allMonsters, id)
                // Remove the family if found
                if (index !== -1) {
                  allMonsters.splice(index, 1)
                }
                // Fetch and add the 2a family
                let secondAwakenedFamily: Family = await fetchMonstersByFamily(id, {
                  family_id: id,
                  awaken_level: 2, // Filtre pour les monstres second awake
                  obtainable: true, // Filtre pour les monstres obtenables
                })
                secondAwakenedFamily.isSecondAwakedFamily = true
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
