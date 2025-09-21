<template>
  <div
    class="group flex flex-col bg-gray-800 rounded-xl shadow-lg border border-[var(--primary-color)]/30 overflow-hidden animate-pulse"
  >
    <div class="relative">
      <!-- Image Skeleton -->
      <div class="aspect-square w-full bg-gray-600 rounded-md mb-2"></div>

      <!-- Type Icon Skeleton -->
      <div class="absolute top-2 left-2 w-8 h-8 bg-gray-500 rounded-full"></div>

      <!-- Checkboxes Skeleton -->
      <div class="absolute bottom-4 right-2 flex flex-col gap-2">
        <div class="w-20 h-4 bg-gray-500 rounded"></div>
        <div class="w-20 h-4 bg-gray-500 rounded"></div>
      </div>
    </div>

    <div class="p-4 pt-2 flex-grow flex flex-row justify-between">
      <!-- Name Skeleton -->
      <div class="h-6 w-3/4 bg-gray-500 rounded mb-1"></div>

      <!-- Stars & ID Skeleton -->
      <div class="flex items-center gap-2">
        <div class="h-4 w-8 bg-gray-500 rounded"></div>
        <div class="w-4 h-4 bg-gray-500 rounded"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
