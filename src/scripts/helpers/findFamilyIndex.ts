import { type Family } from "../../types/monsters.ts";

export function findFamilyIndex(allFamilies: Family[], familyId: number): number {
  return allFamilies.findIndex((fam) => fam.family_id === familyId);
}
