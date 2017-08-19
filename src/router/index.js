import Vue from 'vue'
import Router from 'vue-router'

import NProgress from 'nprogress'  // 页面顶部进度条
import 'nprogress/nprogress.css'

const index = () => import(/* webpackChunkName: "index" */ '../pages/index.vue')

const article = () => import(/* webpackChunkName: "article" */ '../pages/article/index.vue')
const tag = () => import(/* webpackChunkName: "article" */ '../pages/article/tag.vue')
const release = () => import(/* webpackChunkName: "article" */ '../pages/article/release.vue')

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: '首页',
    component: index
  },
  {
    path: '/',
    name: '文章管理',
    component: index,
    children: [
      { path: '/article/index', components: article, name: '文章列表' },
      { path: '/article/tag', components: tag, name: '文章标签' },
      { path: '/article/release', components: release, name: '文章标签' }
    ]
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

