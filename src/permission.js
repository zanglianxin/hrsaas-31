import router from './router'
import store from '@/store'
// 路由全局前置守卫
// 会在所有路由进入之前触发
// to: 去哪里的路由信息
// from: 来自于哪个路由的信息
// next: 是否进入
const whiteList = ['/404', '/login']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  // 1.登录
  if (token) {
    if (!store.state.user.userInfo.userId) {
        store.dispatch('user/getUserInfo')
    }
    // 是否进入登录页
    if (to.path === '/login') {
      // 1.1 是 跳转到首页
      next('/')
    } else {
      // 1.2 不是 直接进入
      next()
    }
  } else {
    // 2. 未登录
    const isCludes = whiteList.includes(to.path)
    // 访问的是否在白名单（未登录也能访问的页面）
    if (isCludes) {
      // 2.1 在白名单， 放行
      next()
    } else {
      // 2.2 不在白名单（不登录不能访问）跳到登录页
      next('/login')
    }
  }
})
