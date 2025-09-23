<template>
  <div class="flex justify-between items-center gap-4 mb-6">
    <button
      @click="triggerFileInputSWEX"
      class="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition-colors"
    >
      <AutofillIcon />
      <span class="inline sm:hidden">Auto-fill</span>
      <span class="hidden sm:inline">Auto-fill from SWEX JSON</span>
    </button>
    <input type="file" ref="fileInputSWEX" @change="onFileChange" accept=".json" class="hidden" />

    <div class="items-center gap-4 w-full flex-1 hidden sm:flex">
      <label class="relative flex items-center w-full">
        <!-- Icône loupe -->
        <div class="absolute left-3 text-[var(--text-secondary)]">
          <SearchIcon />
        </div>

        <!-- Input -->
        <input
          v-model="searchQuery"
          class="w-full h-10 pl-10 pr-4 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] placeholder:text-[var(--text-secondary)]"
          placeholder="Search Monsters..."
          value=""
        />

        <!-- Bouton clear -->
        <button
          v-if="searchQuery"
          type="button"
          @click="searchQuery = ''"
          class="absolute right-2 text-[var(--text-secondary)] hover:text-white"
        >
          <CrossIcon />
        </button>
      </label>
    </div>

    <div class="flex gap-4">
      <button
        @click="saveMonsterClient"
        class="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-75 transition-colors"
      >
        <SaveStateIcon />
        <span class="inline sm:hidden">Save</span>
        <span class="hidden sm:inline">Save State</span>
      </button>
      <button
        @click="triggerFileInput"
        class="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition-colors"
      >
        <LoadStateIcon />
        <span class="inline sm:hidden">Load</span>
        <span class="hidden sm:inline">Load State</span>
      </button>
      <input type="file" ref="fileInput" @change="onFileChange" accept=".json" class="hidden" />
    </div>
  </div>

  <div class="mb-6 items-center gap-4 w-full flex-1 flex sm:hidden">
    <label class="relative flex items-center w-full">
      <!-- Icône loupe -->
      <div class="absolute left-3 text-[var(--text-secondary)]">
        <SearchIcon />
      </div>

      <!-- Input -->
      <input
        v-model="searchQuery"
        class="w-full h-10 pl-10 pr-4 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] placeholder:text-[var(--text-secondary)]"
        placeholder="Search Monsters..."
        value=""
      />

      <!-- Bouton clear -->
      <button
        v-if="searchQuery"
        type="button"
        @click="searchQuery = ''"
        class="absolute right-2 text-[var(--text-secondary)] hover:text-white"
      >
        <CrossIcon />
      </button>
    </label>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    <template v-if="updating">
      <CardSkeleton v-for="n in 8" :key="n" />
    </template>
    <template v-else>
      <template v-for="monsterFamily in renderedFamilies">
        <MonstersRow :family="monsterFamily" :filter="searchQuery" />
      </template>
    </template>
  </div>

  <button
    @click="scrollToTop"
    class="fixed bottom-6 right-6 z-50 block lg:hidden bg-[var(--primary-color)] text-white p-3 rounded-full shadow-lg hover:bg-[var(--accent-color)] transition-colors"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M8 6L12 2L16 6" />
      <path d="M12 2V22" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MonstersRow from './MonstersRow.vue'
import CardSkeleton from './CardSkeleton.vue'
import AutofillIcon from '@/components/subcomponents/icons/Autofill.icon.vue'
import SearchIcon from '@/components/subcomponents/icons/Search.icon.vue'
import CrossIcon from '@/components/subcomponents/icons/Cross.icon.vue'
import SaveStateIcon from '@/components/subcomponents/icons/SaveState.icon.vue'
import LoadStateIcon from '@/components/subcomponents/icons/LoadState.icon.vue'

import { useMonsters } from '@/composables/useMonsters'
import { useBatchFamilies } from '@/composables/useBatchFamilies.ts'

const fileInput = ref<HTMLElement>()
const fileInputSWEX = ref<HTMLElement>()
const searchQuery = ref('')

const { families, updating, progress, saveMonsterClient, loadMonsterClient } = useMonsters()

const { renderedFamilies, startRendering } = useBatchFamilies(families.value)

onMounted(() => {
  startRendering()
})

function triggerFileInput() {
  fileInput.value?.click()
}

function triggerFileInputSWEX() {
  fileInputSWEX.value?.click()
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    loadMonsterClient(file)
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
