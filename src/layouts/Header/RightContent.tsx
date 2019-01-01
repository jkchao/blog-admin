import React from 'react';
import { Menu, Icon } from 'antd';
import styles from './index.module.scss';

interface HeaderMenuProps {
  onMenuClick: () => void;
}

const HeaderMenu = ({ onMenuClick }: HeaderMenuProps) => (
  <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
    <Menu.Item key="userCenter">
      <Icon type="user" />
      <span>account center</span>
    </Menu.Item>
    <Menu.Item key="userinfo">
      <Icon type="setting" />
      <span>account settings</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">
      <Icon type="logout" />
      <span>logout</span>
    </Menu.Item>
  </Menu>
);

export const RightContent = () => {
  // ..
};
