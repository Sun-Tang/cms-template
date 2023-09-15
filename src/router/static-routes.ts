import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/layout.vue'

const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'admin',
    component: Layout,
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('~/pages/login/index.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('~/pages/404.vue')
  }
]

export default staticRoutes
