import { SimpleMonster, ElementType } from "../../types/monsters.js";

export function loggingFamilies(familyId: number, monsters: SimpleMonster[]) {
    const names = monsters.map((m: SimpleMonster) => {
      let icon: string;
      switch (m.element) {
        case ElementType.Fire:
          icon = "🔥";
          break;
        case ElementType.Water:
          icon = "💧";
          break;
        case ElementType.Wind:
          icon = "🍃";
          break;
        case ElementType.Light:
          icon = "✨";
          break;
        case ElementType.Dark:
          icon = "🌑";
          break;
        default:
          icon = "❓";
      }

      let n = m.name;
      if(n.length >= 15)
        n = m.name.slice(0, 15 - 1) + '…';
      
      return `${icon} ${n}`.padEnd(25); 
    });
    console.log(`${familyId}\t`, names.join(''));
}