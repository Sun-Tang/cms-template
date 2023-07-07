import { login } from '@/api/manager'
import { useUserStore } from '~@/store/user'

export const useLogin = () => {
  const userStore = useUserStore()

  const router = useRouter()

  const form = reactive({
    username: '',
    password: '',
  })

  const rules = {
    username: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur',
      },
    ],
  }

  const loading = ref<boolean>(false)

  const onSubmit = (loginFormRef: any) => {
    loginFormRef.validate((valid: any) => {
      if (!valid)
        return false

      loading.value = true
      const { username, password } = form
      login(username, password).then((res: any) => {
        userStore.setToken(res?.token)
        router.push('/')
      }).finally(() => {
        loading.value = false
      })
    })
  }

  return {
    form,
    rules,
    loading,
    onSubmit,
  }
}
