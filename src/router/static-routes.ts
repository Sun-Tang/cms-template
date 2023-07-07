import type { RouteRecordRaw } from 'vue-router'

const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('~/pages/index.vue'),
    meta: {
      title: '后台首页',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('~/pages/login/index.vue'),
    meta: {
      title: '登录页',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('~/pages/404.vue'),
  },
]

export default staticRoutes
