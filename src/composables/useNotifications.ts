import { ref } from 'vue'
import { type Notification } from '@/types/notification'


const notifications = ref<Notification[]>([])
let idCounter = 0

export function useNotifications() {
  function addNotification(type: Notification['type'], title: string, message: string) {
    const id = ++idCounter
    notifications.value.push({ id, type, title, message })

    setTimeout(() => {
      removeNotification(id)
    }, 10000)
  }

  function removeNotification(id: number) {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  return {
    notifications,
    addNotification,
    removeNotification,
  }
}
