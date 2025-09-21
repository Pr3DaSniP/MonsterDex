import { applyFilters } from "../helpers/applyFilters.ts";
import { type SimpleMonster } from "../../types/monsters.ts";
import { type ApiResponse } from "../../types/apiResponse.ts"

export async function fetchSecondAwakenedFamiliesIds(): Promise<number[]> {
  let families_id = new Set<number>();
  const filters = {
    obtainable: true,
    awaken_level: 2, // Filtre pour les monstres éveillés
  };
  let nextUrl: string|null = applyFilters(
    "https://swarfarm.com/api/v2/monsters/?page=1",
    filters
  );

  while (nextUrl) {
    const res = await fetch(nextUrl);
    const data = await res.json() as ApiResponse<SimpleMonster>;
    data.results.forEach((monster: SimpleMonster) => {
      families_id.add(monster.family_id);
    });
    nextUrl = data.next;
  }
  return [...families_id];
}