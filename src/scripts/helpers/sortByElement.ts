import { type SimpleMonster, ElementType } from "../../types/monsters.js";

const ELEMENT_ORDER: String[] = ["Water", "Fire", "Wind", "Light", "Dark"];

const emptyMonster: SimpleMonster = {
  com2us_id: -1,
  id: -1,
  name: "???",
  natural_stars: 0,
  image_filename: null,
  element: ElementType.Unknown,
  family_id: -1,
  owned: false,
  full_skill: false
};

// Fonction pour trier les monstres selon l'ordre des éléments
export function sortByElement(family: SimpleMonster[]): SimpleMonster[] {
  const sorted: SimpleMonster[] = ELEMENT_ORDER.map((element) => {
    const found = family.find((m: SimpleMonster) => m.element === element);
    return found ?? emptyMonster;
  });
  return sorted;
}