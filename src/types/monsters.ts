enum ElementType {
  Fire = 'Fire',
  Water = 'Water',
  Wind = 'Wind',
  Light = 'Light',
  Dark = 'Dark',
  Unknown = 'Unknown',
}

type SimpleMonster = {
  com2us_id: number
  id: number
  name: string
  natural_stars: number
  image_filename: string | null
  element: ElementType
  family_id: number
  owned: boolean
  full_skill: boolean
}

type DualMonster = [SimpleMonster, SimpleMonster]

type BackgroundMonsterImg = {image_filename: string}

export { type SimpleMonster, type DualMonster, ElementType, type BackgroundMonsterImg }
