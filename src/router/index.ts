import { createRouter, createWebHistory } from 'vue-router'
import HelloWorldVue from '@/components/HelloWorld.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: HelloWorldVue
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home.vue')
    }
  ]
})

export default router
