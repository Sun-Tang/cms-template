<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs
        v-model="activeTab"
        type="card"
        @tab-click="tabClick"
        @tab-remove="removeTab"
        @tab-change="changeTab"
      >
        <el-tab-pane
          v-for="item in tabList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.path !== '/'"
        />
      </el-tabs>
      <el-dropdown @command="handleClose">
        <el-button size="small" type="primary">
          <span>更多</span>
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TabPaneName, TabsPaneContext } from 'element-plus'

import type { TabFace } from '~@/interface'

const router = useRouter()
const route = useRoute()

const commonStore = useCommonStore()

const { tabList } = storeToRefs(commonStore)

const activeTab = ref(route.path)

const removeTab = (targetName: TabPaneName) => {
  const tabs = tabList.value
  let a: string = activeTab.value
  if (a === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) a = nextTab.path
      }
    })
  }

  activeTab.value = a
  tabList.value = tabList.value.filter(
    (tab: TabFace) => tab.path !== targetName
  )
}

// Tab Click
const tabClick = (tabItem: TabsPaneContext) => {
  const fullPath = tabItem.props.name as string
  router.push(fullPath)
}

const changeTab = (t: any) => {
  activeTab.value = t
  router.push(t)
}

const handleClose = (c: string) => {
  if (c === 'clearAll') {
    // 切换回首页
    activeTab.value = '/'
    // 过滤只剩下首页
    tabList.value = [
      {
        title: '首页',
        path: '/'
      }
    ]
  } else if (c === 'clearOther') {
    // 过滤只剩下首页和当前激活
    tabList.value = tabList.value.filter(
      (tab: TabFace) => tab.path === '/' || tab.path === activeTab.value
    )
  }
}

onBeforeRouteUpdate((to, from) => {
  activeTab.value = to.path
  const tabObj: TabFace = {
    title: to.meta.title as string,
    path: to.path
  }
  commonStore.addTab(tabObj)
})
</script>

<style scoped lang="less">
.tabs-box {
  background-color: var(--el-bg-color);
  .tabs-menu {
    position: relative;
    width: 100%;
    .el-dropdown {
      position: absolute;
      top: 8px;
      right: 13px;
    }
    :deep(.el-tabs) {
      .el-tabs__header {
        @apply px-2 m-0 box-border;
        height: 40px;
        .el-tabs__nav-wrap {
          position: absolute;
          width: calc(100% - 110px);
          .el-tabs__nav {
            @apply flex border-none;
            .el-tabs__item {
              @apply flex items-center justify-center border-none;
              color: #afafaf;
              .tabs-icon {
                margin: 1.5px 4px 0 0;
                font-size: 15px;
              }
              .is-icon-close {
                margin-top: 1px;
              }
              &.is-active {
                color: var(--el-color-primary);
                &::before {
                  position: absolute;
                  bottom: 0;
                  width: 100%;
                  height: 0;
                  content: '';
                  border-bottom: 2px solid var(--el-color-primary) !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
