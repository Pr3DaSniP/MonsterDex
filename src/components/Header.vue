<template>
  <header class="flex items-center justify-between border-b border-[var(--primary-color)]/30 px-10 py-4 shadow-lg bg-[var(--background-color)]">
    <!-- Logo  -->
    <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3 text-white">
      <div class="size-8 text-[var(--primary-color)]">
        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 0L48 24L24 48L0 24L24 0Z" fill="currentColor"></path>
          <path d="M36 21H12L24 9L36 21Z" fill="var(--background-color)"></path>
        </svg>
      </div>
      <h1 class="text-2xl font-bold tracking-tighter text-[var(--primary-color)]">MonsterDex</h1>
    </RouterLink>

    <!-- Nav  -->
    <nav class="flex items-center gap-8">
      <RouterLink :to="{ name: 'monsters.show' }" :class="linkClass('monsters.show')">Monsters</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router'

const route = useRoute()

function linkClass(name: string) {
    return [
        'text-sm font-medium transition-colors',
        route.name === name
            ? 'text-[var(--primary-color)]'
            : 'text-[var(--text-primary)] hover:text-[var(--primary-color)]'
    ]
}
</script>