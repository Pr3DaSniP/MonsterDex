import { type Family, type SimpleMonsterWithVariants } from "../../types/monsters.ts";

export function loggingFamily(family: Family) {
  const iconMap: Record<string, string> = {
    Fire: "🔥",
    Water: "💧",
    Wind: "🍃",
    Light: "✨",
    Dark: "🌑",
    Unknown: "❓"
  };

  const names = family.monsters.map((m: SimpleMonsterWithVariants) => {
    const icon = iconMap[m.element] ?? "❓";

    const firstVariant = m.variants[0];
    let n = firstVariant?.name ?? "???";

    if (n.length >= 15) {
      n = n.slice(0, 14) + "…";
    }

    return `${icon} ${n}`.padEnd(25);
  });

  console.log(`${family.family_id}\t`, names.join(""));
}