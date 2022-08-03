// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTokenTime } from './auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例

const isTimeout = () => {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 3 * 60 * 60* 1000
  return currentTime - tokenTime > timeout
}

// 请求拦截器
service.interceptors.request.use(async (config) => {
  if (store.state.user.token) {
    if (isTimeout()) {
      // 判断token是否过期 过期 跳到登录页
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      // token没有过期再携带
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 请求成功的函数
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async function (error) {
    // 对响应错误做点什么
    if (error?.response?.status === 401) {
      await store.dispatch('user/logout')
      router.push('/login')
      Message.error('身份验证失败，请重新登录')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)
export default service // 导出axios实例
