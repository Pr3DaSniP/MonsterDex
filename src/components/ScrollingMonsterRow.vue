<template>
    <div class="scroll-container">
      <div class="scroll-inner" :style="animationStyle">
          <img v-for="monster in displayMonsters" :key="monster.id" :src="VITE_API_IMG_URL + monster.image_filename"
          class="w-32 h-32 object-cover rounded-4xl opacity-50" />
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useBackgroundMonsters } from '@/composables/useMonstersBackground'
import type { ScrollingMonstersProps } from '@/types/props/ScrollingMonsters'
import { type BackgroundMonsterImg } from '@/types/monsters';

const props = defineProps<ScrollingMonstersProps>()
const VITE_API_IMG_URL = import.meta.env.VITE_API_IMG_URL

const { loadMonsters } = useBackgroundMonsters()
const displayMonsters = ref<BackgroundMonsterImg[]>([]);

const direction = props.direction ?? 'left'
const speed = props.speed ?? 40

const animationStyle = computed(() => ({
  animation: `scroll ${speed}s linear infinite`,
  animationDirection: direction === 'left' ? 'normal' : 'reverse',
}))

onMounted(async () => {
  const monsters = await loadMonsters(props.id, 20)
  displayMonsters.value = [...monsters, ...monsters]
})
</script>


<style scoped>
.scroll-container {
  overflow: hidden;
  mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
  -webkit-mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
  height: 10rem;
}

.scroll-inner {
  display: flex;
  padding-block: 1rem;
  gap: 1rem;
  width: max-content;
}
</style>
