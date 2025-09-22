<template>
  <Loading v-if="globalLoading" :progress="globalProgress" />
  <RouterView v-else />
</template>

<script setup lang="ts">

// TODO: Virtualisation pour charger instant la page monsters
// TODO: version mobile pour les boutons de chargement/search bar

import Loading from './components/Loading.vue';
import { useMonsters } from './composables/useMonsters.ts';
import { useBackgroundMonsters } from './composables/useMonstersBackground.ts';
import { computed, onMounted } from 'vue'

const { loading: loadingBackgroundImage, progress: progressBackgroundImage, loadAllImagesMonsters } = useBackgroundMonsters();
const { loading: loadingMonsters, progress: progressMonsters, loadAllMonsters } = useMonsters();

const globalProgress = computed(() => {
  const monstersProgress = progressMonsters.value || 0
  const backgroundProgress = progressBackgroundImage.value || 0
  return (monstersProgress + backgroundProgress) / 2
})

const globalLoading = computed(() => loadingMonsters.value || loadingBackgroundImage.value)

onMounted(async () => {
  await loadAllImagesMonsters();
  await loadAllMonsters();
})

</script>

<style scoped></style>
