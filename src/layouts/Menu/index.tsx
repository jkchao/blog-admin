import React from 'react';

import { Menu as AntMenu, Icon } from 'antd';
import { Link } from 'react-router-dom';

// const renderMenuItem = (
//   item // item.route 菜单单独跳转的路由
// ) => (
//   <AntMenu.Item key={item.key}>
//     <Link to={(item.route || item.key) + (item.query || '')}>
//       {item.icon && <Icon type={item.icon} />}
//       <span className="nav-text">{item.title}</span>
//     </Link>
//   </AntMenu.Item>
// );

// const renderSubMenu = item => (
//   <AntMenu.SubMenu
//       key={item.key}
//       title={
//           <span>
//               {item.icon && <Icon type={item.icon} />}
//               <span className="nav-text">{item.title}</span>
//           </span>
//       }
//   >
//       {item.subs.map(item => renderMenuItem(item))}
//   </AntMenu.SubMenu>
// );

export const Menu = () => (
  <AntMenu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
    <AntMenu.Item key="1">
      <Icon type="user" />
      <span>nav 1</span>
    </AntMenu.Item>
    <AntMenu.Item key="2">
      <Icon type="video-camera" />
      <span>nav 2</span>
    </AntMenu.Item>
    <AntMenu.Item key="3">
      <Icon type="upload" />
      <span>nav 3</span>
    </AntMenu.Item>
  </AntMenu>
);
