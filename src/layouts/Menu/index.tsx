import React from 'react';

import { Menu as AntMenu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Menus } from '@/router/config';
import { MenuProps as AntMenuProps } from 'antd/lib/menu';

const renderMenuItem = (
  item: MenuItem // item.route 菜单单独跳转的路由
) => (
  <AntMenu.Item key={item.key}>
    <Link to={item.key}>
      {item.icon && <Icon type={item.icon} />}
      <span className="nav-text">{item.title}</span>
    </Link>
  </AntMenu.Item>
);

const renderSubMenu = (item: MenuItem) => (
  <AntMenu.SubMenu
    key={item.key}
    title={
      <span>
        {item.icon && <Icon type={item.icon} />}
        <span className="nav-text">{item.title}</span>
      </span>
    }
  >
    {item.subMenu!.map(item => renderMenuItem(item))}
  </AntMenu.SubMenu>
);

interface MenuItem {
  key: string;
  title: string;
  icon: string;
  subMenu?: MenuItem[];
}

type MenuProps = {
  menu: MenuItem[];
} & AntMenuProps;

export const Menu = ({ menu, ...props }: MenuProps) => (
  <AntMenu {...props}>
    {menu.map(item =>
      item.subMenu ? renderSubMenu(item) : renderMenuItem(item)
    )}
  </AntMenu>
);
