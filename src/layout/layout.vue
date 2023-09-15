<template>
  <el-container class="layout">
    <el-aside :width="asideWidth" class="layout-left">
      <FMenu />
    </el-aside>
    <el-container>
      <el-header class="layout-right">
        <FHeader />
        <FTagList />
      </el-header>
      <el-main>
        <!-- 缓存最大10个 -->
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <keep-alive :max="10">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import FHeader from './components/FHeader.vue'
import FMenu from './components/FMenu.vue'
import FTagList from './components/FTagList.vue'

import { useCommonStore } from '@/store/common'
const commonStore = useCommonStore()

const { asideWidth } = storeToRefs(commonStore)
</script>

<style scoped lang="less">
.layout {
  .layout-left {
    background-color: rgb(39, 39, 74);
  }
  .layout-right {
    height: 90px;
  }
  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s;
  }
  .fade-enter-active {
    transition-delay: 0.3s;
  }
}
</style>
