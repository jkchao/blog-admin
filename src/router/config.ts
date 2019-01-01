import { lazy } from 'react';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const ArticlesList = lazy(() => import('@/pages/Articles/List'));
const ArticlesRelease = lazy(() => import('@/pages/Articles/Release'));
const Comments = lazy(() => import('@/pages/Comments'));
const Heros = lazy(() => import('@/pages/Heros'));
const Links = lazy(() => import('@/pages/Links'));
const Tags = lazy(() => import('@/pages/Tags'));
const Set = lazy(() => import('@/pages/Set'));

export const Menus = [
  {
    path: '/dashboard',
    title: '首页',
    icon: 'home',
    component: Dashboard
  },
  {
    path: '/article',
    title: '文章',
    icon: 'project',
    subMenu: [
      {
        path: '/article/list',
        title: '文章列表',
        icon: 'bars',
        component: ArticlesList
      },
      {
        path: '/article/release',
        title: '文章编辑',
        icon: 'edit',
        component: ArticlesRelease
      }
    ]
  },
  { path: '/tag', title: '标签', icon: 'tags', component: Tags },
  {
    path: '/comment',
    title: '评论',
    icon: 'message',
    component: Comments
  },
  { path: '/heros', title: '留言墙', icon: 'home', component: Heros },
  {
    path: '/links',
    title: '友情链接',
    icon: 'link',
    component: Links
  },
  { path: '/set', title: '设置', icon: 'setting', component: Set }
];
