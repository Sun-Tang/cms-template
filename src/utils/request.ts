import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { useUserStore } from '~@/store/user'
import { dateFilter } from '@/utils/index'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API ?? '/',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    const { token } = storeToRefs(userStore)
    if (token) config.headers.token = token.value

    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    const userStore = useUserStore()
    const data = response.data
    if (data?.code === 10024) {
      ElMessage.error(data.message)
      userStore.token = ''
      window.location.href = '/'
    } else if (data?.code === 1) {
      ElMessage.error(data.message)
      return data
    } else {
      // 对响应数据做点什么
      if (data.result.data?.length > 0) {
        dateFilter(data.result.data)
      }
      return data
    }
  },
  error => {
    // 对响应错误做点什么

    ElMessage.error(error.response?.data.msg)
    return Promise.reject(error)
  }
)

// interface Data {
//   [index: string]: unknown
// }

interface Http {
  get: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>
  post: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>
  put: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>
  patch: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>
  delete: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>
}

const http: Http = {
  get(url, data, config) {
    return instance.get(url, {
      params: data,
      ...config
    })
  },
  post(url, data, config) {
    return instance.post(url, data, config)
  },
  put(url, data, config) {
    return instance.put(url, data, config)
  },
  patch(url, data, config) {
    return instance.patch(url, data, config)
  },
  delete(url, data, config) {
    return instance.delete(url, {
      data,
      ...config
    })
  }
}

export default http
