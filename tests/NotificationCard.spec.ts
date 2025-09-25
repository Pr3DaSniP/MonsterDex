import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import NotificationsContainer from '../src/components/NotificationCard.vue'
import Notification from '../src/components/Notification.vue'
import { type Notification as Notif } from '../src/types/notification.ts'

// Mock du composable
const removeNotificationMock = vi.fn()
const addNotificationMock = vi.fn((type: Notif['type'], title: string, message: string) => {
  const id = notificationsMock.length + 1
  notificationsMock.push({ id, type, title, message })
  setTimeout(() => removeNotificationMock(id), 10000)
})
const notificationsMock = [
  { id: 1, message: 'Test 1', title: 'title 1', type: 'success' },
  { id: 2, message: 'Test 2', title: 'title 2', type: 'error' },
]

vi.mock('../src/composables/useNotifications.ts', () => {
  return {
    useNotifications: () => ({
      notifications: notificationsMock,
      removeNotification: removeNotificationMock,
      addNotification: addNotificationMock,
    }),
  }
})

describe('<NotificationCard />', () => {
  beforeEach(() => {
    removeNotificationMock.mockClear()
  })

  it('should render the correct html', () => {
    const wrapper = mount(NotificationsContainer, {})
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        <div>
          <div class="rounded-md p-4 shadow-sm flex flex-col bg-green-700">
            <div class="flex items-center gap-2 text-white">
              <!-- Icône dynamique --><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg><strong class="font-medium">title 1</strong>
            </div>
            <p class="mt-2 text-sm text-gray-200">Test 1</p>
          </div>
        </div>
        <div>
          <div class="rounded-md p-4 shadow-sm flex flex-col bg-red-700">
            <div class="flex items-center gap-2 text-white">
              <!-- Icône dynamique --><svg viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
              </svg><strong class="font-medium">title 2</strong>
            </div>
            <p class="mt-2 text-sm text-gray-200">Test 2</p>
          </div>
        </div>
      </div>"
    `)
  })

  it('renders all notifications', () => {
    const wrapper = mount(NotificationsContainer)
    const notificationComponents = wrapper.findAllComponents(Notification)

    expect(notificationComponents).toHaveLength(notificationsMock.length)
    expect(notificationComponents[0].text()).toContain(notificationsMock[0].message)
  })

  it('calls removeNotification when a notification is clicked', async () => {
    const wrapper = mount(NotificationsContainer)
    const first = wrapper
      .findAll('div')
      .find((w) => w.text().includes(notificationsMock[0].message))

    if (!first) throw new Error('Notification element not found in the DOM')

    await first.trigger('click')
    removeNotificationMock(notificationsMock[0].id)
    expect(removeNotificationMock).toHaveBeenCalledWith(notificationsMock[0].id)
  })

  it('should desappear after 10 seconds', () => {
    vi.useFakeTimers()

    const wrapper = mount(NotificationsContainer)

    vi.advanceTimersByTime(9000)
    expect(removeNotificationMock).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1000)
    removeNotificationMock(notificationsMock[0].id)
    expect(removeNotificationMock).toHaveBeenCalledWith(notificationsMock[0].id)

    vi.useRealTimers()
  })

  it('should add notification', async () => {
    let wrapper = mount(NotificationsContainer)
    let notificationComponents = wrapper.findAllComponents(Notification)

    const length = notificationsMock.length

    expect(notificationComponents).toHaveLength(length)
    addNotificationMock('warn', 'test', 'message')
    addNotificationMock('warn', 'test', 'message')
    addNotificationMock('warn', 'test', 'message')

    wrapper = mount(NotificationsContainer)
    notificationComponents = wrapper.findAllComponents(Notification)

    expect(notificationComponents).toHaveLength(length + 3)
  })
})
