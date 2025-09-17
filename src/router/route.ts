import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  { path: '/monsters', component: () => import('@/views/Monsters.vue'), name: 'monsters.show' },
  { path: '/', component: () => import('@/views/Home.vue'), name: 'home' },
  { path: '/:pathMatch(.*)*', component: () => import('@/views/Home.vue'), name: 'notFound' },
]