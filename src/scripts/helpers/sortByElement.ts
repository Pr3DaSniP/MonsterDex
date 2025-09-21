import { type SimpleMonsterWithVariants, type Family } from '../../types/monsters'
import { ElementType } from '../../types/element'

const ELEMENT_ORDER: String[] = ['Water', 'Fire', 'Wind', 'Light', 'Dark']

export const emptyMonsterWithVariants: SimpleMonsterWithVariants = {
  element: ElementType.Unknown,
  natural_stars: 0,
  skill_group_id: -1,
  skill_ups_to_max: -1,
  owned: false,
  full_skill: false,
  variants: [
    {
      com2us_id: -1,
      id: -1,
      name: '???',
      image_filename: null,
      family_id: -1,
    },
  ],
}

export function sortFamilyByElement(family: Family): Family {
  const sortedMonsters: SimpleMonsterWithVariants[] = ELEMENT_ORDER.map((element) => {
    const found = family.monsters.find((m) => m.element === element)
    return found ?? emptyMonsterWithVariants
  })

  return {
    ...family,
    monsters: sortedMonsters,
  }
}
