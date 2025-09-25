import { beforeEach, describe, it, expect } from "vitest";
import { createRouter, createMemoryHistory, Router } from "vue-router";
import { mount } from '@vue/test-utils'

import { routes } from "../src/router/route.ts";
import Header from "../src/components/Header.vue"

describe('<Header />', () => {

  let router: Router
  beforeEach(async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: routes,
    })
    router.push('/')
    await router.isReady()
  })

  it('should render the correct html', () => {
    const wrapper = mount(Header, { global: { plugins: [router] } })
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<header class="flex items-center justify-between border-b border-[var(--primary-color)]/30 px-10 py-4 shadow-lg bg-[var(--background-color)]">
        <!-- Logo  --><a aria-current="page" href="/" class="router-link-active router-link-exact-active flex items-center gap-3 text-white">
          <div class="size-8 text-[var(--primary-color)]"><img src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20stroke='%23ea2a33'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'%20viewBox='0%200%2024%2024'%20%3e%3cpath%20d='M12%202L2%207l10%205%2010-5-10-5z'%3e%3c/path%3e%3cpath%20d='M2%2017l10%205%2010-5'%3e%3c/path%3e%3cpath%20d='M2%2012l10%205%2010-5'%3e%3c/path%3e%3c/svg%3e"></div>
          <h1 class="text-2xl font-bold tracking-tighter text-[var(--primary-color)] hidden sm:block">MonsterDex</h1>
        </a><!-- Nav  -->
        <nav class="flex items-center gap-8"><a href="/monsters" class="text-sm font-medium transition-colors text-[var(--text-primary)] hover:text-[var(--primary-color)]">Monsters</a>
          <!-- <RouterLink :to="{ name: 'stats.show' }" :class="linkClass('stats.show')"
              >Statistiques</RouterLink
            > -->
        </nav>
      </header>"
    `)
  })

  it('renders the logo and the title', () => {
    const wrapper = mount(Header, { global: { plugins: [router] } })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.text()).toContain('MonsterDex')
  })

  it('applies the correct class when the route is active', async () => {
    router.push({ name: 'monsters.show' })
    await router.isReady()

    const wrapper = mount(Header, { global: { plugins: [router] } })
    const link = wrapper.find('a[href="/monsters"]')
    expect(link.classes().join(' ')).toContain('text-[var(--primary-color)]')
  })

  it('should render the tilte only on larger screens', () => {
    const wrapper = mount(Header, { global: { plugins: [router] } })
    const title = wrapper.find('h1')
    // Le titre doit avoir la classe Tailwind "hidden sm:block"
    expect(title.classes()).toContain('hidden')
    expect(title.classes()).toContain('sm:block')
  })

  it('should render a header element with navigation', () => {
    const wrapper = mount(Header, { global: { plugins: [router] } })
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('nav').exists()).toBe(true)
  })

})