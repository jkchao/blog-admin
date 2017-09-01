import Vue from 'vue'
import Router from 'vue-router'

import NProgress from 'nprogress'  // 页面顶部进度条
import 'nprogress/nprogress.css'

const login = () => import(/* webpackChunkName: "login" */ '../pages/login')

const index = () => import(/* webpackChunkName: "index" */ '../pages/index')

const home = () => import(/* webpackChunkName: "home" */ '../pages/home/index')

const article = () => import(/* webpackChunkName: "article" */ '../pages/article/index')
const tag = () => import(/* webpackChunkName: "article" */ '../pages/article/tags')
const release = () => import(/* webpackChunkName: "article" */ '../pages/article/release')

const analytics = () => import(/* webpackChunkName: "analytics" */ '../pages/analytics/index')

const heros = () => import(/* webpackChunkName: "heros" */ '../pages/heros/index')

const set = () => import(/* webpackChunkName: "set" */ '../pages/set/index')

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: '我的面板',
    component: index,
    leaf: true,
    icon: 'icon-home',
    children: [
      { path: '/home', component: home, name: '我的面板', meta: { page: 'home', requiresAuth: true } }
    ]
  },
  {
    path: '/',
    name: '文章管理',
    component: index,
    icon: 'icon-article',
    children: [
      { path: '/article/index', component: article, name: '文章列表', icon: 'icon-list', meta: { page: 'article', requiresAuth: true } },
      { path: '/article/tag', component: tag, name: '文章标签', icon: 'icon-tag', meta: { page: 'article', requiresAuth: true } },
      { path: '/article/release', component: release, name: '发布文章', icon: 'icon-write', meta: { page: 'article', requiresAuth: true } }
    ]
  },
  {
    path: '/',
    name: '英雄榜',
    component: index,
    leaf: true,
    icon: 'icon-hero',
    children: [
      { path: '/heros', component: heros, name: '英雄榜', meta: { page: 'heros', requiresAuth: true } }
    ]
  },
  {
    path: '/',
    name: '全局设置',
    component: index,
    leaf: true,
    icon: 'icon-set',
    children: [
      { path: '/set', component: set, name: '全局设置', meta: { page: 'set', requiresAuth: true } }
    ]
  },
  {
    path: '/',
    name: 'Google Analytics',
    component: index,
    leaf: true,
    icon: 'icon-count',
    children: [
      { path: '/analytics', component: analytics, name: 'Google Analytics', meta: { page: 'analytics', requiresAuth: true } }
    ]
  },
  {
    path: '/login',
    name: '登陆',
    component: login,
    meta: { requiresAuth: false }
  }
]

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!window.localStorage.getItem('TOKEN')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

router.afterEach(transition => {
  NProgress.done()
})

export default router

