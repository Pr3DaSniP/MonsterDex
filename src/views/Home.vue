<template>
  <div
    class="relative flex flex-col items-center justify-evenly min-h-screen bg-[var(--background-color)] bg-cover bg-center text-white"
  >
    <!-- Logo -->
    <div class="size-60 text-[var(--primary-color)]">
      <img :src="logo" />
    </div>

    <!-- Contenu centré -->
    <div class="z-10 text-center px-4">
      <h1 class="text-5xl font-bold mb-6">
        Bienvenue sur
        <span class="font-bold tracking-tighter text-[var(--primary-color)]">MonsterDEX</span>
      </h1>
      <p class="text-xl mb-8">Découvrez tous vos monstres et gérez votre collection facilement.</p>
      <RouterLink
        :to="{ name: 'monsters.show' }"
        class="inline-block px-8 py-4 bg-[var(--primary-color)] hover:bg-[var(--accent-color)] rounded-lg font-semibold shadow-lg transition-colors"
      >
        Voir les monstres
      </RouterLink>
    </div>

    <div class="w-full">
      <ScrollingMonsterRow :speed="60" :direction="'right'" :id="1" />
      <ScrollingMonsterRow :speed="45" :direction="'left'" :id="2" />
      <ScrollingMonsterRow :speed="30" :direction="'right'" :id="3" />
    </div>
  </div>
</template>

<script setup>
import ScrollingMonsterRow from '@/components/ScrollingMonsterRow.vue'
import bgImage from '@/assets/background-home.png'
import logo from '@/assets/logo.svg'
</script>
