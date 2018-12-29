import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const ArticlesList = lazy(() => import('../pages/Articles/List'));
const ArticlesRelease = lazy(() => import('../pages/Articles/Release'));
const Comments = lazy(() => import('../pages/Comments'));
const Heros = lazy(() => import('../pages/Heros'));
const Links = lazy(() => import('../pages/Links'));
const Tags = lazy(() => import('../pages/Tags'));
const Set = lazy(() => import('../pages/Set'));

// TODO:懒加载
export const Menus = [
  {
    key: '/dashboard',
    title: '首页',
    icon: 'home',
    component: Dashboard
  },
  {
    key: '/article',
    title: '文章',
    icon: 'project',
    subMenu: [
      {
        key: '/article/list',
        title: '文章列表',
        icon: 'bars',
        component: ArticlesList
      },
      {
        key: '/article/release',
        title: '文章编辑',
        icon: 'edit',
        component: ArticlesRelease
      }
    ]
  },
  { key: '/tag', title: '标签', icon: 'tags', component: Tags },
  {
    key: '/comment',
    title: '评论',
    icon: 'message',
    component: Comments
  },
  { key: '/heros', title: '留言墙', icon: 'home', component: Heros },
  {
    key: '/links',
    title: '友情链接',
    icon: 'link',
    component: Links
  },
  { key: '/set', title: '设置', icon: 'setting', component: Set }
];
