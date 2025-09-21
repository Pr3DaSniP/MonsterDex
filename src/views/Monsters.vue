<template>
  <div
    class="min-h-screen bg-[var(--background-color)] bg-cover bg-center text-white"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="sticky top-0 z-50">
      <Header />
    </div>
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-10 overflow-x-hidden">
      <NotificationCard />
      <MonstersGrid />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import MonstersGrid from '@/components/MonstersGrid.vue'
import bgImage from '@/assets/background-home.png'
import NotificationCard from '@/components/NotificationCard.vue'
</script>
