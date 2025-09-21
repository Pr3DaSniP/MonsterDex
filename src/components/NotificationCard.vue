<template>
  <div class="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
    <div
      v-for="n in notifications"
      :key="n.id"
      @click="removeNotification(n.id)"
    >
      <Notification :notification="n" />
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { useNotifications } from '@/composables/useNotifications'
import Notification from './Notification.vue';

const { notifications, removeNotification } = useNotifications()

</script>