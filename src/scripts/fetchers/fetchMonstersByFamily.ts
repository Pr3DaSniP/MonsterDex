import { applyFilters } from "../helpers/applyFilters";
import { sortFamilyByElement } from "../helpers/sortByElement";
import { SimpleMonsterWithVariants, type Family, type SimpleMonster } from "../../types/monsters";
import { type ApiResponse } from "../../types/apiResponse"

export async function fetchMonstersByFamily(familyId: number, filters: Object): Promise<Family> {
  const url: string = applyFilters(
    `https://swarfarm.com/api/v2/monsters/?`,
    filters
  )
  const res = await fetch(url);
  const data = await res.json() as ApiResponse<SimpleMonster>;

  const family : Family = buildFamily(data.results);

  return sortFamilyByElement(family);
}

function buildFamily(monsters: SimpleMonster[]): Family {
  if (monsters.length === 0) {
    throw new Error("Impossible de créer une famille vide")
  }

  const familyName = extractFamilyNameFromSlug(monsters[0].bestiary_slug);

  return {
    family_id: monsters[0].family_id,
    family_name: familyName,
    isSecondAwakedFamily: false,
    isCollaboredFamily: false,
    isMergedFamily: false,
    monsters: monsters.map(m => getSimpleMonsterWithVariants(m)),
  }
}


function extractFamilyNameFromSlug(slug: string): string {
  const parts = slug.split("-");
  if (parts.length < 3) {
    return slug; // sécurité si le format est invalide
  }
  const familyParts = parts.slice(2, -1);
  return familyParts.join("-") || slug; // retourne le slug complet si le nom de famille est vide
}

function getSimpleMonsterWithVariants(monster: SimpleMonster): SimpleMonsterWithVariants {
  return {
    element: monster.element,
    natural_stars: monster.natural_stars,
    skill_group_id: monster.skill_group_id,
    owned: false,
    full_skill: false,
    variants: getVariantMonster(monster)
  };
}

function getVariantMonster(monster: SimpleMonster) {
  return [{
    name: monster.name,
    image_filename: monster.image_filename,
    family_id: monster.family_id,
    id: monster.id,
    com2us_id: monster.com2us_id
  }];
}