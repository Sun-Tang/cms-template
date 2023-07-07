<script setup lang="ts">
import { useLogin } from './composables/login'

const loginFormRef = ref()

const { form, rules, loading, onSubmit } = useLogin()
</script>

<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div class="left-text">
        <div>
          欢迎光临
        </div>
        <div class="text-gray-200 text-base">
          此站点是一个后台管理系统模版
        </div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">
        欢迎回来
      </h2>
      <div class="right-text">
        <span class="h-[1px] w-16 bg-gray-200" />
        <span>账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-200" />
      </div>
      <el-form ref="loginFormRef" :model="form" :rules="rules" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码">
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button round color="#626aef" class="w-[250px]" type="primary" :loading="loading" @click="onSubmit(loginFormRef)">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped lang="less">
.login-container{
    @apply min-h-screen bg-indigo-500;
    .left{
      @apply flex items-center justify-center;
        .left-text{
            div:first-child{
                @apply font-bold text-5xl text-light-50 mb-4;
            }
            div:last-child{
                @apply text-gray-200 text-sm;
            }
        }
    }
    .right{
        @apply bg-light-50 flex items-center justify-center flex-col;
        .title{
            @apply font-bold text-3xl text-gray-800;
        }
        .right-text{
          @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
        }
    }
}
</style>
