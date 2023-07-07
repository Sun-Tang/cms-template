<script setup lang="ts">
import { useUserStore } from '~@/store/user'

const userStore = useUserStore()

const router = useRouter()

const logout = () => {
  ElMessageBox.confirm('是否退出登录？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  },
  ).then(() => {
    userStore.accountLogout(() => {
      router.push('/login')
    })
  })
}
</script>

<template>
  <div>
    后台首页
    <el-button @click="logout">
      退出
    </el-button>
  </div>
</template>

<style scoped>

</style>
