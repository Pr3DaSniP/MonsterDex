<template>
  <div class="flex justify-between items-center gap-4 mb-6">
    <button
      @click="triggerFileInputSWEX"
      class="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition-colors"
    >
      <AutofillIcon />
      Auto-fill from SWEX JSON
    </button>
    <input
      type="file"
      ref="fileInputSWEX"
      @change="onFileChange"
      accept=".json"
      class="hidden"
    />

    <div class="flex items-center gap-4 w-full flex-1">
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
        Save State
      </button>
      <button
        @click="triggerFileInput"
        class="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition-colors"
      >
        <LoadStateIcon />
        Load State
      </button>
      <input
        type="file"
        ref="fileInput"
        @change="onFileChange"
        accept=".json"
        class="hidden"
      />
    </div>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    <template v-if="loading">
      <CardSkeleton v-for="n in 8" :key="n" />
    </template>
    <template v-else>
      <template v-for="monsterFamily in families">
        <MonstersRow :family="monsterFamily" :filter="searchQuery" />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MonstersRow from './MonstersRow.vue'
import CardSkeleton from './CardSkeleton.vue'
import AutofillIcon from '@/components/subcomponents/icons/Autofill.icon.vue'
import SearchIcon from '@/components/subcomponents/icons/Search.icon.vue'
import CrossIcon from '@/components/subcomponents/icons/Cross.icon.vue'
import SaveStateIcon from '@/components/subcomponents/icons/SaveState.icon.vue'
import LoadStateIcon from '@/components/subcomponents/icons/LoadState.icon.vue'

import { useMonsters } from '@/composables/useMonsters'

const fileInput = ref<HTMLElement>()
const fileInputSWEX = ref<HTMLElement>()
const searchQuery = ref('')

const { families, loading, saveMonsterClient, loadMonsterClient } = useMonsters()

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
</script>
