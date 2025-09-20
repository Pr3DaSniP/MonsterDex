import { applyFilters } from "../helpers/applyFilters";
import { sortByElement } from "../helpers/sortByElement";
import { type SimpleMonster } from "../../types/monsters";
import { type ApiResponse } from "../../types/apiResponse"

export async function fetchMonstersByFamily(familyId: number, filters: Object): Promise<SimpleMonster[]> {
  const url: string = applyFilters(
    `https://swarfarm.com/api/v2/monsters/?`,
    filters
  )
  const res = await fetch(url);
  const data = await res.json() as ApiResponse<SimpleMonster>;

  const monsters: SimpleMonster[] = data.results.map((monster: SimpleMonster) => ({
    com2us_id: monster.com2us_id,
    id: monster.id,
    name: monster.name,
    natural_stars: monster.natural_stars,
    image_filename: monster.image_filename,
    element: monster.element,
    family_id: monster.family_id,
    owned: false,
    full_skill: false,
    skill_group_id: monster.skill_group_id,
    bestiary_name: monster.bestiary_name,
  }));

  return sortByElement(monsters);
}