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
  skill_group_id: number
  owned: boolean
  full_skill: boolean
}

type DualMonster = [SimpleMonster, SimpleMonster]

type BackgroundMonsterImg = {image_filename: string, id: number}

type Family = {
  family_id: number
  family_name: string
  isSecondAwakedFamily: boolean
  isCollaboredFamily: boolean
  isMergedFamily: boolean
  monsters: (SimpleMonster | DualMonster)[]
}

type MonsterRule =
  | { type: "merge"; families: [number, number] }
  | { type: "cmd"; commands: ("fetch_2a" | "collab")[] }

export { type SimpleMonster, type DualMonster, ElementType, type BackgroundMonsterImg, type Family, type MonsterRule, type TestMonster }

type TestMonster = {
  element: ElementType,
  natural_stars: number
  skill_group_id: number
  variants: {
    name: string,
    image_filename: string | null,
    family_id: number
    id: number
    com2us_id: number  
  }[]
}