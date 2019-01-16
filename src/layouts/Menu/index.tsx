import React from 'react';

import { Menu as AntMenu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { MenuProps as AntMenuProps } from 'antd/lib/menu';

interface MenuItem {
  path: string;
  title: string;
  icon: string;
  redirect?: string;
  subMenu?: MenuItem[];
}

type MenuProps = {
  menu: MenuItem[];
} & AntMenuProps;

const renderMenuItem = (item: MenuItem) => (
  <AntMenu.Item key={item.path}>
    <Link to={item.redirect || item.path}>
      {item.icon && <Icon type={item.icon} />}
      <span className="nav-text">{item.title}</span>
    </Link>
  </AntMenu.Item>
);

const renderSubMenu = (item: MenuItem) => (
  <AntMenu.SubMenu
    key={item.path}
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

export const BaseMenu = ({ menu, ...props }: MenuProps) => (
  <AntMenu {...props}>
    {menu.map(item =>
      item.subMenu ? renderSubMenu(item) : renderMenuItem(item)
    )}
  </AntMenu>
);
