import type { RouteRecordRaw } from 'vue-router'

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    component: () => import('~/pages/index.vue'),
    meta: {
      title: '后台首页'
    }
  }
]

export default asyncRoutes
