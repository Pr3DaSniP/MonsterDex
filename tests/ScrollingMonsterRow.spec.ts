import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import ScrollingMonstersRow from '../src/components/ScrollingMonsterRow.vue'

// Mock de useBackgroundMonsters
vi.mock('../src/composables/useMonstersBackground.ts', () => ({
  useBackgroundMonsters: vi.fn(() => ({
    getRandomMonsters: vi.fn((id: number, count: number) => [
      { id: 1, image_filename: 'monster1.png' },
      { id: 2, image_filename: 'monster2.png' },
    ]),
    loading: false,
    progress: 100,
  })),
}))

describe('<ScrollingMonsterRow />', () => {

    it('should render the correct html', () => {
    const wrapper = mount(ScrollingMonstersRow, {
      props: { id: 42, direction: 'right', speed: 30 },
    })
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div data-v-1463a8b5="" class="scroll-container">
        <div data-v-1463a8b5="" class="scroll-inner" style="animation: scroll 30s linear infinite; animation-direction: reverse;"></div>
      </div>"
    `)
  })


  it('should render images', async () => {
    const wrapper = mount(ScrollingMonstersRow, {
      props: { id: 42, direction: 'right', speed: 30 },
    })

    // Attendre que onMounted soit exécuté
    await wrapper.vm.$nextTick()

    const imgs = wrapper.findAll('img')
    expect(imgs.length).toBe(4) // 2 x 2 parce qu’on double le tableau

    expect(imgs[0].attributes('src')).toContain('monster1.png')
    expect(imgs[1].attributes('src')).toContain('monster2.png')
  })

  it('applies correct animation styles', () => {
    const wrapper = mount(ScrollingMonstersRow, {
      props: { id: 1, direction: 'left', speed: 50 },
    })
    const inner = wrapper.find('.scroll-inner')
    expect(inner.attributes('style')).toContain('scroll 50s linear infinite')
    expect(inner.attributes('style')).toContain('animation-direction: normal')
  })
})
