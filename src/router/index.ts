import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig, Route, NavigationGuard } from 'vue-router'

import { loginIn } from '../utils/loginIn'

const login: AsyncComponent = (): any => import(/* webpackChunkName: "login" */ '@/pages/login.vue')

const index: AsyncComponent = (): any => import(/* webpackChunkName: "index" */ '@/pages/index.vue')

const home: AsyncComponent = (): any => import(/* webpackChunkName: "home" */ '@/pages/home/index.vue')

const article: AsyncComponent = (): any => import(/* webpackChunkName: "article" */ '@/pages/article/index.vue')
const release: AsyncComponent = (): any => import(/* webpackChunkName: "article" */ '@/pages/article/release.vue')

const tag: AsyncComponent = (): any => import(/* webpackChunkName: "tag" */ '@/pages/tags/index.vue')

const comments: AsyncComponent = (): any => import(/* webpackChunkName: "comments" */ '@/pages/comments/index.vue')

const heros: AsyncComponent = (): any => import(/* webpackChunkName: "heros" */ '@/pages/heros/index.vue')

const set: AsyncComponent = (): any => import(/* webpackChunkName: "set" */ '@/pages/set/index.vue')

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: '我的面板',
    component: index,
    redirect: '/home',
    meta: { leaf: true, icon: 'icon-home' },
    children: [
      { path: '/home', component: home, name: '我的面板', meta: { requiresAuth: true } }
    ]
  },
  {
    path: '/',
    name: '文章管理',
    component: index,
    meta: { leaf: false, icon: 'icon-article' },
    children: [
      { path: '/article/index', component: article, name: '文章列表', meta: { requiresAuth: true, icon: 'icon-list' } },
      { path: '/article/release', component: release, name: '发布文章', meta: { requiresAuth: true, icon: 'icon-write' } }
    ]
  },
  {
    path: '/',
    name: '文章标签',
    component: index,
    meta: { leaf: true, icon: 'icon-tag' },
    children: [
      { path: '/tag', component: tag, name: '文章标签', meta: { equiresAuth: true, icon: 'icon-tag' } }
    ]
  },
  {
    path: '/',
    name: '评论',
    component: index,
    meta: { leaf: true, icon: 'icon-comments' },
    children: [
      { path: '/comment', component: comments, name: '评论', meta: { requiresAuth: true, icon: 'icon-comments' } }
    ]
  },
  {
    path: '/',
    name: '留言墙',
    component: index,
    meta: { leaf: true, icon: 'icon-hero' },
    children: [
      { path: '/heros', component: heros, name: '留言墙', meta: { requiresAuth: true } }
    ]
  },
  {
    path: '/',
    name: '全局设置',
    component: index,
    meta: { leaf: true, icon: 'icon-set' },
    children: [
      { path: '/set', component: set, name: '全局设置', meta: { page: 'set', requiresAuth: true } }
    ]
  },
  {
    path: '/login',
    name: '登陆',
    component: login,
    meta: { requiresAuth: false }
  }
]

const router: Router = new Router({
  mode: 'history',
  base: __dirname,
  routes
})

router.beforeEach((to: Route, from: Route, next: Function): void => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loginIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
