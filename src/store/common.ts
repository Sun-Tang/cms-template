import type { TabFace } from '~@/interface'

export const useCommonStore = defineStore(
  'common',
  () => {
    // 侧边宽度
    const asideWidth = ref<string>('250px')

    // tab列表
    const tabList = ref<TabFace[]>([
      {
        title: '首页',
        path: '/'
      }
    ])

    const setAsideWidth = (): void => {
      asideWidth.value = asideWidth.value === '250px' ? '64p' : '250px'
    }

    // 添加标签导航
    const addTab = (obj: TabFace) => {
      const noTab =
        tabList.value.findIndex((t: TabFace) => t.path === obj.path) === -1
      if (noTab) tabList.value.push(obj)
    }
    return {
      asideWidth,
      tabList,
      setAsideWidth,
      addTab
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: sessionStorage, paths: ['tabList'] }]
    }
  }
)
