import Vue from 'vue'
import Router, { RouteConfig, Route, NavigationGuard, RawLocation } from 'vue-router'

import { loginIn } from '@/utils/loginIn'

const Login = () => import(/* webpackChunkName: "login" */ '@/pages/Login.vue')

const Index = () => import(/* webpackChunkName: "index" */ '@/pages/Index.vue')

const Home = () => import(/* webpackChunkName: "home" */ '@/pages/Home/Index.vue')

const Article = () => import(/* webpackChunkName: "article" */ '@/pages/Article/Index.vue')
const Release = () => import(/* webpackChunkName: "article" */ '@/pages/Article/Release.vue')

const Tag = () => import(/* webpackChunkName: "tag" */ '@/pages/Tags/Index.vue')

const Comments = () => import(/* webpackChunkName: "comments" */ '@/pages/Comments/Index.vue')

const Heros = () => import(/* webpackChunkName: "heros" */ '@/pages/Heros/Index.vue')

const Set = () => import(/* webpackChunkName: "set" */ '@/pages/Set/Index.vue')

const Book = () => import(/* webpackChunkName: "book" */ '@/pages/Book/Index.vue')

const Link = () => import(/* webpackChunkName: "book" */ '@/pages/Links/Index.vue')


Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: '我的面板',
    component: Index,
    redirect: '/home',
    meta: { leaf: true, icon: 'icon-home' },
    children: [
      { path: '/home', component: Home, name: '我的面板', meta: { requiresAuth: true } }
    ]
  },
  {
    path: '/',
    name: '文章管理',
    component: Index,
    meta: { leaf: false, icon: 'icon-article' },
    children: [
      { path: '/article/index', component: Article, name: '文章列表', meta: { requiresAuth: true, icon: 'icon-list' } },
      { path: '/article/release', component: Release, name: '发布文章', meta: { requiresAuth: true, icon: 'icon-write' } }
    ]
  },
  {
    path: '/',
    name: '文章标签',
    component: Index,
    meta: { leaf: true, icon: 'icon-tag' },
    children: [
      { path: '/tag', component: Tag, name: '文章标签', meta: { equiresAuth: true, icon: 'icon-tag' } }
    ]
  },
  {
    path: '/',
    name: '评论',
    component: Index,
    meta: { leaf: true, icon: 'icon-comments' },
    children: [
      { path: '/comment', component: Comments, name: '评论', meta: { requiresAuth: true, icon: 'icon-comments' } }
    ]
  },
  {
    path: '/',
    name: '留言墙',
    component: Index,
    meta: { leaf: true, icon: 'icon-hero' },
    children: [
      { path: '/heros', component: Heros, name: '留言墙', meta: { requiresAuth: true } }
    ]
  },
  {
    path: '/',
    name: '书',
    component: Index,
    meta: { leaf: true, icon: 'icon-sell' },
    children: [
      { path: '/book', component: Book, name: '书', meta: { requiresAuth: true } }
    ]
  },
  {
    path: '/',
    name: '友链',
    component: Index,
    meta: { leaf: true, icon: 'icon-link1' },
    children: [
      { path: '/link', component: Link, name: '友链', meta: { requiresAuth: true } }
    ]
  },
  {
    path: '/',
    name: '全局设置',
    component: Index,
    meta: { leaf: true, icon: 'icon-set' },
    children: [
      { path: '/set', component: Set, name: '全局设置', meta: { page: 'set', requiresAuth: true } }
    ]
  },
  {
    path: '/login',
    name: '登陆',
    component: Login,
    meta: { requiresAuth: false }
  }
]

const router: Router = new Router({
  mode: 'history',
  base: __dirname,
  routes
})

router.beforeEach((to: Route, from: Route, next: any): void => {
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
