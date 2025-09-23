<template>
  <header
    class="flex items-center justify-between border-b border-[var(--primary-color)]/30 px-10 py-4 shadow-lg bg-[var(--background-color)]"
  >
    <!-- Logo  -->
    <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3 text-white">
      <div class="size-8 text-[var(--primary-color)]">
        <img :src="logo" />
      </div>
      <h1 class="text-2xl font-bold tracking-tighter text-[var(--primary-color)] hidden sm:block">MonsterDex</h1>
    </RouterLink>

    <!-- Nav  -->
    <nav class="flex items-center gap-8">
      <RouterLink :to="{ name: 'monsters.show' }" :class="linkClass('monsters.show')"
        >Monsters</RouterLink
      >
      <!-- <RouterLink :to="{ name: 'stats.show' }" :class="linkClass('stats.show')"
        >Statistiques</RouterLink
      > -->
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import logo from '@/assets/logo.svg'

const route = useRoute()

function linkClass(name: string) {
  return [
    'text-sm font-medium transition-colors',
    route.name === name
      ? 'text-[var(--primary-color)]'
      : 'text-[var(--text-primary)] hover:text-[var(--primary-color)]',
  ]
}
</script>
