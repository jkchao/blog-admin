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
    title: 'Home',
    icon: 'home',
    component: Dashboard
  },
  {
    path: '/article',
    title: 'Articles',
    icon: 'project',
    subMenu: [
      {
        path: '/article/list',
        title: 'List',
        icon: 'bars',
        component: ArticlesList
      },
      {
        path: '/article/release',
        title: 'Edit',
        icon: 'edit',
        component: ArticlesRelease
      }
    ]
  },
  { path: '/tag', title: 'Tags', icon: 'tags', component: Tags },
  {
    path: '/comment',
    title: 'Comment',
    icon: 'message',
    component: Comments
  },
  { path: '/heros', title: 'Heros', icon: 'fire', component: Heros },
  {
    path: '/links',
    title: 'Links',
    icon: 'link',
    component: Links
  },
  { path: '/set', title: 'Set', icon: 'setting', component: Set }
];
