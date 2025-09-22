<template>
  <div class="bg-[var(--background-color)] font-display text-white">
    <div class="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div class="flex flex-col items-center justify-center space-y-8">
        <div class="size-60 text-[var(--primary-color)]">
          <img :src="logoAnimate">
        </div>
        <h1
          class="text-2xl font-bold tracking-wider text-background-dark dark:text-background-light animate-pulse"
        >
          Scanning for monsters...
        </h1>
        <div class="w-80 h-2 bg-[var(--primary-color)]/20 rounded-full overflow-hidden">
          <div class="h-full bg-[var(--primary-color)] animate-pulse" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoAnimate from '@/assets/animateLogo.svg'
defineProps<{
    progress: number
}>();
</script>

<style scoped></style>
