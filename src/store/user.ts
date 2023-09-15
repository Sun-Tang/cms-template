import { getMenus } from '@/api'
import { menuFilter } from '@/utils/index'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>()
    const userInfo = ref<any>()

    const setUserMenus = (): void => {
      getMenus().then(res => {
        if (res.code === 0) {
          userInfo.value.menus = menuFilter(res.result)
          window.location.href = '/'
          ElMessage({
            message: '登录成功.',
            type: 'success'
          })
        }
      })
    }

    const setToken = (userInfoNew: any) => {
      token.value = userInfoNew.token
      userInfo.value = userInfoNew
      setUserMenus()
    }

    // 必须加回调不然获取不到router变量
    const accountLogout = (fn: Function) => {
      logout().finally(() => {
        token.value = ''
        userInfo.value = ''
        fn()
        ElMessage({
          type: 'success',
          message: '退出成功'
        })
      })
    }

    return {
      token,
      userInfo,
      setToken,
      setUserMenus,
      accountLogout
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: sessionStorage, paths: ['token', 'userInfo'] }]
    }
  }
)
