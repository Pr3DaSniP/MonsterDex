import { Family } from "../../types/monsters";

export function findFamilyIndex(allFamilies: Family[], familyId: number): number {
  return allFamilies.findIndex((fam) => fam.family_id === familyId);
}
