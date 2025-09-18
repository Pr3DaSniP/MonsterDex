import { type SimpleMonster, type TestMonster } from '../../types/monsters'
import { saveJson } from '../helpers/jsonUtils.js'

export function mergeCollabFamilies(
  familyIds: number[],
  allMonsters: SimpleMonster[][],
): SimpleMonster[][] {
  if (familyIds.length !== 2) return allMonsters // Need at least two families to merge

  const index1 = allMonsters.findIndex((fam) => {
    const valid = fam.find((m) => m.family_id != -1)
    return valid?.family_id === familyIds[0]
  })
  const index2 = allMonsters.findIndex((fam) => {
    const valid = fam.find((m) => m.family_id != -1)
    return valid?.family_id === familyIds[1]
  })

  if (index1 === -1 || index2 === -1) {
    console.warn(`One of the families to merge not found: ${familyIds}`)
    return allMonsters
  }

  const fam1 = allMonsters[index1]
  const fam2 = allMonsters[index2]

  const dualFamily: TestMonster[] = []

  for (let i = 0; i < 5; i++) {
    const m1 = fam1[i]
    const m2 = fam2[i]

    let dual: TestMonster = {
      element: m1.element,
      natural_stars: m1.natural_stars,
      skill_group_id: m1.skill_group_id,
      variants: [
        {
          name: m1.name,
          image_filename: m1.image_filename,
          family_id: m1.family_id,
          id: m1.id,
          com2us_id: m1.com2us_id,
        },
        {
          name: m2.name,
          image_filename: m2.image_filename,
          family_id: m2.family_id,
          id: m2.id,
          com2us_id: m2.com2us_id,
        },
      ],
    }
    dualFamily.push(dual)
  }

  saveJson('./public/data/collab', `collab_${familyIds[0]}_${familyIds[1]}`, dualFamily);

  return allMonsters
}
