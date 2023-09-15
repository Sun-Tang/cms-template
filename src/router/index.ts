import { createRouter, createWebHistory } from 'vue-router'
import nprogress from 'nprogress'
import staticRoutes from './static-routes'
import asyncRoutes from './async-routes'
import { useUserStore } from '~@/store/user'

const router = createRouter({
  routes: [...staticRoutes],
  history: createWebHistory(import.meta.env.VITE_APP_BASE ?? '/')
})

// 动态添加路由方法
export const addRoutes = (menus: any) => {
  // 是否有新的路由
  let hasNewRoutes = false
  const findAndAddRoutesByMenus = (arr: any) => {
    arr?.forEach((e: any) => {
      const item = asyncRoutes.find((o: any) => o.path === e.url)
      if (item && !router.hasRoute(item.path)) {
        router.addRoute('admin', item)
        hasNewRoutes = true
      }
      if (e.children && e.children.length > 0) findAndAddRoutesByMenus(e.children)
    })
  }

  findAndAddRoutesByMenus(menus)

  return hasNewRoutes
}

// 全局前置守卫
let hasGetInfo = false
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const { token, userInfo } = storeToRefs(userStore)

  // 显示loading
  nprogress.start()

  // 没有登录，强制跳转回登录页
  if (!token.value && to.path !== '/login') {
    ElMessage.error('请先登录')
    return next({ path: '/login' })
  }

  // 防止重复登录
  if (token.value && to.path === '/login') {
    ElMessage.error('请勿重复登录')
    return next({ path: from.path ? from.path : '/' })
  }

  // 如果用户登录了，自动获取用户信息，并存储在pinia当中
  let hasNewRoutes = false
  if (token && !hasGetInfo) {
    hasGetInfo = true
    // 动态添加路由
    hasNewRoutes = addRoutes(userInfo.value?.menus)
    console.log(router)
    console.log(hasNewRoutes)
  }

  // 设置页面的标题
  const title = `${to.meta.title ? to.meta.title : ''}-后台管理`
  document.title = title

  hasNewRoutes ? next(to.fullPath) : next()
})

// 全局后置守卫
router.afterEach(() => nprogress.done())

export default router
