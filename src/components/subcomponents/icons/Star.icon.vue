<template>
    <svg :style="{ width: size + 'px', height: size + 'px' }" fill="currentColor" viewBox="0 0 22 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M20.924 7.625a1.523 1.523 0 00-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 00-2.752 0L7.365 5.847l-5.051.734a1.535 1.535 0 00-.851 2.615l3.656 3.563-.863 5.031a1.532 1.532 0 002.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 002.226-1.617l-.863-5.03 3.656-3.563a1.523 1.523 0 00.387-1.575z" />
    </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
    size?: number
}>();
</script>