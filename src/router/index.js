import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import NProgress from 'nprogress'  // 页面顶部进度条
import 'nprogress/nprogress.css'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  }
]

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(transition => {
  NProgress.done()
})

export default router

