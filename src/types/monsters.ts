import { ElementType } from './element.ts'

type BackgroundMonsterImg = { image_filename: string; id: number }

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
  bestiary_slug: string
}

type VariantMonster = {
  name: string
  image_filename: string | null
  family_id: number
  id: number
  com2us_id: number
}

type SimpleMonsterWithVariants = {
  element: ElementType
  natural_stars: number
  skill_group_id: number
  owned: boolean
  full_skill: boolean
  variants: VariantMonster[]
}

type Family = {
  family_id: number
  family_name: string
  isSecondAwakedFamily: boolean
  isCollaboredFamily: boolean
  isMergedFamily: boolean
  monsters: SimpleMonsterWithVariants[]
}

type MonsterRule =
  | { type: 'merge'; families: [number, number] }
  | { type: 'cmd'; commands: ('fetch_2a' | 'collab')[] }

type SavedMonster = {
  owned: boolean
  full_skill: boolean
  family_id: number
  id: number
  com2us_id: number
}

export {
  type BackgroundMonsterImg,
  type SimpleMonster,
  type VariantMonster,
  type SimpleMonsterWithVariants,
  type Family,
  type MonsterRule,
  type SavedMonster,
}
