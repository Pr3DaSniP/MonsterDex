<template>
  <div class="min-h-screen bg-[var(--background-color)] bg-cover bg-center text-white">
    <div class="sticky top-0 z-50">
      <Header />
    </div>
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-10 overflow-x-hidden">
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
</script>
