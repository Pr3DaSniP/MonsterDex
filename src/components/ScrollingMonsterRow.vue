<template>
    <div class="scroll-container">
      <div class="scroll-inner" ref="gridRef" :style="{
        animation: `scroll ${speed}s ${direction === 'left' ? 'forwards' : 'reverse'} linear infinite`
      }">
          <img v-for="monster in randomMonsters" :key="monster.id" :src="VITE_API_IMG_URL + monster.image_filename"
          class="w-32 h-32 object-cover rounded-4xl opacity-50" />
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { decode } from '@msgpack/msgpack';

import { type BackgroundMonsterImg } from '@/types/monsters.ts';
import { type ScrollingMonstersProps } from '@/types/props/ScrollingMonsters.ts';

const props = defineProps<ScrollingMonstersProps>();

const gridRef = ref<HTMLElement>(null);
const randomMonsters = ref<BackgroundMonsterImg[]>([]);

const direction = props.direction ?? 'left';
const speed = props.speed ?? 40; // valeur par défaut
const VITE_API_IMG_URL = import.meta.env.VITE_API_IMG_URL;

onMounted(async () => {
  try {
    const res = await fetch("/data/all_monsters_images.msgpack");
    const buffer = await res.arrayBuffer();
    const monsters: BackgroundMonsterImg[] = decode(new Uint8Array(buffer)) as BackgroundMonsterImg[];
    randomMonsters.value = pickRandomValidMonsters(monsters, 50);
  } catch (e: unknown) {
    if (e instanceof Error) console.error("Erreur de chargement:", err);
    else console.error("Erreur de chargement:", e);
    randomMonsters.value = [];
  }

  await addAnimation();
});

async function addAnimation(): Promise<void> {
  await nextTick();
  if (!gridRef.value) return;

  // Récupérer tous les enfants <img> de gridRef
  const images: NodeListOf<HTMLImageElement> =
    gridRef.value.querySelectorAll('img');


  images.forEach((img: HTMLImageElement, index: number): void => {
    const imgClone: HTMLImageElement = img.cloneNode(true) as HTMLImageElement;

    // Ajouter/Modifier des attributs
    imgClone.setAttribute('aria-hidden', 'true');
    imgClone.alt = `Image clonée ${index + 1}`;

    gridRef.value!.appendChild(imgClone);
  });
}

function pickRandomValidMonsters(arr: backgroundMonsters[], n: number): backgroundMonsters[] {
  const validMonsters = arr.filter(m => m.image_filename != null); // on ne garde que ceux avec une image
  const result: backgroundMonsters[] = [];
  const taken = new Set<number>();

  while (result.length < n && taken.size < validMonsters.length) {
    const index = Math.floor(Math.random() * validMonsters.length);
    if (!taken.has(index)) {
      result.push(validMonsters[index]);
      taken.add(index);
    }
  }
  return result;
}

</script>

<style scoped>
.scroll-container {
  overflow: hidden;
  mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
  -webkit-mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
}

.scroll-inner {
  display: flex;
  padding-block: 1rem;
  gap: 1rem;
  width: max-content;
}
</style>
