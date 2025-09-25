import { beforeEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Notification from '../src/components/Notification.vue'

import SuccessIcon from '../src/components/subcomponents/icons/Success.icon.vue'
import ErrorIcon from '../src/components/subcomponents/icons/Error.icon.vue'
import DefaultIcon from '../src/components/subcomponents/icons/Default.icon.vue'

const notificationsMock = [
  {
    id: 1,
    type: 'success',
    title: 'Titre',
    message: 'Message',
  },
  {
    id: 2,
    type: 'errord',
    title: 'Titre Erreur',
    message: 'Message Erreur',
  },
  {
    id: 3,
    type: 'warn',
    title: 'Titre warn',
    message: 'Message warn',
  },
]

describe('<Notification />', () => {
  it('should render the correct HTML', () => {
    const wrapper = mount(Notification, { props: { notification: notificationsMock[0] } })
    expect(wrapper.html()).toMatchInlineSnapshot(`
          "<div class="rounded-md p-4 shadow-sm flex flex-col bg-green-700">
            <div class="flex items-center gap-2 text-white">
              <!-- Icône dynamique --><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg><strong class="font-medium">Titre</strong>
            </div>
            <p class="mt-2 text-sm text-gray-200">Message</p>
          </div>"
        `)
  })

  it('should render the correct background', () => {
    notificationsMock.forEach((n) => {
      const wrapper = mount(Notification, { props: { notification: n } })
      const expectedClass =
        n.type === 'success' ? 'bg-green-700' : n.type === 'error' ? 'bg-red-700' : 'bg-blue-700'

      expect(wrapper.classes()).toContain(expectedClass)
    })
  })

  it('should render the correct icon', () => {
    notificationsMock.forEach((n) => {
      const wrapper = mount(Notification, { props: { notification: n } })

      let expectedIcon
      switch (n.type) {
        case 'success':
          expectedIcon = SuccessIcon
          break
        case 'error':
          expectedIcon = ErrorIcon
          break
        default:
          expectedIcon = DefaultIcon
          break
      }

      const iconComponent = wrapper.findComponent(expectedIcon)
      expect(iconComponent.exists()).toBe(true)
    })
  })

  it('should render the correct title and message', () => {
    notificationsMock.forEach((n) => {
      const wrapper = mount(Notification, { props: { notification: n } })
      expect(wrapper.text()).toContain(n.title)
      const title = wrapper.find('strong')
      expect(title.text()).toBe(n.title)

      expect(wrapper.text()).toContain(n.message)
      const message = wrapper.find('p')
      expect(message.text()).toBe(n.message)
    })
  })
})
