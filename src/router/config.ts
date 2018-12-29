import { pages } from '@/pages';

// TODO:懒加载
export const Menus = [
  {
    key: '/dashboard',
    title: '首页',
    icon: 'home',
    component: pages.Dashboard
  },
  {
    key: '/article',
    title: '文章管理',
    icon: 'home',
    component: pages.Article
  },
  { key: '/tag', title: '标签管理', icon: 'home', component: pages.Tags },
  {
    key: '/comment',
    title: '评论管理',
    icon: 'home',
    component: pages.Comments
  },
  { key: '/heros', title: '留言墙管理', icon: 'home', component: pages.Heros },
  {
    key: '/links',
    title: '友情链接管理',
    icon: 'home',
    component: pages.Links
  },
  { key: '/set', title: '设置', icon: 'home', component: pages.Set }
];
