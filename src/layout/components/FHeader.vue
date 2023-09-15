<template>
  <div class="f-header">
    <el-icon class="icon-btn" @click="commonStore.setAsideWidth">
      <Fold v-if="asideWidth === '250px'" />
      <Expand v-else />
    </el-icon>
    <div class="ml-auto flex items-center">
      <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
        <el-icon class="icon-btn" @click="handleRefresh">
          <Refresh />
        </el-icon>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown">
        <span class="flex items-center text-gray-600">
          <el-avatar class="mr-2" :size="25" :src="`${baseUrl + userInfo.avatar}`" />
          {{ userInfo.name }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toPath('/changePassword')">修改密码</el-dropdown-item>
            <el-dropdown-item @click="toPath('/modifyUserInfo')">修改资料</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { baseUrl } from '@/api/index'
const userStore = useUserStore()
const commonStore = useCommonStore()

const router = useRouter()

const { isFullscreen, toggle } = useFullscreen()

const { userInfo } = storeToRefs(userStore)
const { asideWidth, tabList } = storeToRefs(commonStore)

const logout = () => {
  ElMessageBox.confirm('是否退出登录？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.accountLogout(() => {
      router.push('/login')
      // 过滤只剩下首页
      tabList.value = [
        {
          title: '首页',
          path: '/'
        }
      ]
    })
  })
}

const toPath = (path: string) => {
  router.push(path)
}

const handleRefresh = () => location.reload()
</script>

<style scoped lang="less">
.f-header {
  @apply flex items-center text-light-50 pr-5;
  height: 50px;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #e4e7ed;
  .icon-btn {
    @apply flex justify-center items-center;
    width: 50px;
    height: 50px;
    color: #666;
    cursor: pointer;
  }
  .icon-btn:hover {
    @apply bg-gray-100;
  }
  .dropdown {
    @apply flex justify-center items-center mx-3;
    height: 50px;
    cursor: pointer;
  }
}
</style>
