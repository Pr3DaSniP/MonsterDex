<template>
  <div
    class="relative flex flex-col items-center justify-evenly min-h-screen bg-[var(--background-color)] bg-cover bg-center text-white"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <!-- Logo -->
    <div class="size-60 text-[var(--primary-color)]">
      <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 0L48 24L24 48L0 24L24 0Z" fill="currentColor"></path>
        <path d="M36 21H12L24 9L36 21Z" fill="var(--background-color)"></path>
      </svg>
    </div>

    <!-- Contenu centré -->
    <div class="z-10 text-center px-4">
      <h1 class="text-5xl font-bold mb-6">
        Bienvenue sur
        <span class="font-bold tracking-tighter text-[var(--primary-color)]">MonsterDEX</span>
      </h1>
      <p class="text-xl mb-8">Découvrez tous vos monstres et gérez votre collection facilement.</p>
      <RouterLink
        to="{name: 'monsters.show'}"
        class="inline-block px-8 py-4 bg-[var(--primary-color)] hover:bg-[var(--accent-color)] rounded-lg font-semibold shadow-lg transition-colors"
      >
        Voir les monstres
      </RouterLink>
    </div>

    <!-- https://modrinth.com/ -->
    <div class="w-full">
      <ScrollingMonsterRow :speed="60" :direction="'right'" />
      <ScrollingMonsterRow :speed="45" :direction="'left'" />
      <ScrollingMonsterRow :speed="30" :direction="'right'" />
    </div>
  </div>
</template>

<script setup>
import ScrollingMonsterRow from '@/components/ScrollingMonsterRow.vue'
import bgImage from '@/assets/background-home.png'
</script>
