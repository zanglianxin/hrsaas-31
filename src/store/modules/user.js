import { getUserDetail, getUserInfoApi, login } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
import {resetRouter} from '@/router'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },

    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    // 登录获取token
    async getToken(context, payload) {
      const res = await login(payload)
      // console.log(res);
      context.commit('setToken', res)
      setTokenTime()
    },
    // 获取用户信息
    async getUserInfo(context) {
      const userInfoBase = await getUserInfoApi()
      const userInfo = await getUserDetail(userInfoBase.userId)
      context.commit('setUserInfo', {...userInfoBase, ...userInfo})
      return userInfoBase
    },
    // 退出登录
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      resetRouter()
      context.commit('permission/setRoutes', [], {root: true})
    }
  }
}
