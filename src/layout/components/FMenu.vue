<template>
  <div class="f-menu">
    <span class="logo">
      <el-icon class="mr-1"><ElemeFilled /></el-icon>
      <span v-if="isCollapse">后台管理系统</span>
    </span>
    <el-menu
      router
      :collapse="!isCollapse"
      :default-active="defaultActive"
      unique-opened
      background-color="rgb(39, 39, 74)"
      text-color="white"
      class="border-none"
    >
      <template v-for="(item, index) in asideMenus" :key="index">
        <el-sub-menu
          v-if="item.children && item.children.length > 0"
          :index="item.title"
        >
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <template
            v-for="(newItem, newIndex) in item.children"
            :key="newIndex"
          >
            <el-menu-item :index="newItem.url">
              <el-icon>
                <component :is="newItem.icon" />
              </el-icon>
              <span>{{ newItem.title }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :index="item.url">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const commonStore = useCommonStore()

const userStore = useUserStore()

const { asideWidth } = storeToRefs(commonStore)

const { userInfo } = storeToRefs(userStore)

// 默认选中
const defaultActive = computed(() => {
  return route.path
})

const isCollapse = computed<boolean>(() => {
  return asideWidth.value === '250px'
})

const asideMenus = computed(() => {
  return userInfo.value.menus
})
</script>

<style scoped lang="less">
.f-menu {
  @apply min-h-screen;
  transition: all 0.5s;
  .logo {
    @apply flex items-center justify-center text-light-50 text-xl font-thin;
    height: 100px;
  }
}
</style>
