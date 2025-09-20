<template>
  <div
    class="group flex flex-col bg-gray-800 rounded-xl shadow-lg border border-[var(--primary-color)]/30 transition-all duration-300 hover:scale-105 hover:shadow-[var(--primary-color)]/20 hover:shadow-2xl overflow-hidden"
    v-show="!isHidden"
  >
    <div class="relative">
      <div class="aspect-square w-full">
        <img
          alt="name"
          :class="[
            'w-full',
            'h-full',
            'object-cover',
            'card-image',
            !monsterWithVariant.owned ? 'blackandwhite' : '',
          ]"
          :src="API_IMG_URL + monster.image_filename"
          loading="lazy"
        />
      </div>
      <Typeicon :size="32" :type="monsterWithVariant.element"></Typeicon>
      <div class="absolute bottom-4 right-2 flex items-end flex-col gap-2">
        <Checkbox label="Possédé" v-model="monsterWithVariant.owned"></Checkbox>
        <Checkbox label="Full Skill" v-model="monsterWithVariant.full_skill"></Checkbox>
      </div>
    </div>
    <div class="p-4 pt-2 flex-grow flex flex-row justify-between">
      <h3 class="text-xl font-bold text-white mb-1">
        {{ name }}
      </h3>
      <div class="flex flex-row justify-center items-center gap-1">
        {{ monsterWithVariant.natural_stars }}
        <svg
          :class="['w-5', 'h-5', 'text-yellow-300']"
          fill="currentColor"
          viewBox="0 0 22 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.924 7.625a1.523 1.523 0 00-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 00-2.752 0L7.365 5.847l-5.051.734a1.535 1.535 0 00-.851 2.615l3.656 3.563-.863 5.031a1.532 1.532 0 002.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 002.226-1.617l-.863-5.03 3.656-3.563a1.523 1.523 0 00.387-1.575z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkbox from './subcomponents/checkbox.vue'
import Typeicon from './subcomponents/typeicone.vue'
import { computed, onMounted } from 'vue'
import { type CardAndDualCardProps } from '@/types/props/CardAndDualCard'

const props = defineProps<CardAndDualCardProps>()
const monsterWithVariant = props.monster
const API_IMG_URL = import.meta.env.VITE_API_IMG_URL

const name = computed(() => {
  if (monsterWithVariant.variants.length === 1) {
    return monsterWithVariant.variants[0].name
  }
  return monsterWithVariant.variants.map((m) => truncate(m.name, 15)).join(' | ')
})

const monster = computed(() => {
  return monsterWithVariant.variants[0]
})

const isHidden = computed(() => {
  if (!props.filter) return false
  const query = props.filter.toLowerCase()
  return !monsterWithVariant.variants.some(v => v.name.toLowerCase().includes(query))
})

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max - 1) + '…' : str
}
</script>

<style scoped>
.card-image {
  -webkit-mask-image: linear-gradient(to top, transparent 10%, var(--color-gray-800) 30%);
  mask-image: linear-gradient(to top, transparent 10%, var(--color-gray-800) 30%);
}

.blackandwhite {
  filter: grayscale(100%);
}

.group:hover .card-image {
  filter: grayscale(0%);
  transition: filter 0.3s ease;
}
</style>
