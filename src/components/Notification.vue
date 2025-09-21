<template>
  <div
    class="rounded-md p-4 shadow-sm flex flex-col"
    :class="bgClass"
  >
    <div class="flex items-center gap-2 text-white">
      <!-- Icône dynamique -->
      <component
        :is="icon"
        class="size-6"
      />
      <strong class="font-medium">{{ props.notification.title }}</strong>
    </div>

    <p class="mt-2 text-sm text-gray-200">
      {{ props.notification.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { NotificationsProps } from '@/types/props/Notifications.ts'
import { computed } from 'vue'
import SuccessIcon from './subcomponents/icons/Success.icon.vue';
import ErrorIcon from './subcomponents/icons/Error.icon.vue';
import DefaultIcon from './subcomponents/icons/Default.icon.vue';

// props
const props = defineProps<NotificationsProps>()

// Map type → couleur de fond
const bgClass = computed(() => {
  switch (props.notification.type) {
    case 'success':
      return 'bg-green-700'
    case 'error':
      return 'bg-red-700'
    default:
      return 'bg-blue-700'
  }
})

// Map type → icône (en composants Vue)
const icon = computed(() => {
  switch (props.notification.type) {
    case 'success':
      return SuccessIcon;
    case 'error':
      return ErrorIcon
    default:
      return DefaultIcon
  }
})
</script>
