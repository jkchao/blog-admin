import React from 'react';
import { Menu, Icon, Dropdown, Avatar } from 'antd';
import styles from './index.module.scss';

interface HeaderProps {
  onMenuClick: () => void;
  currentUser: {
    avatar: string;
    name: string;
  };
}

export class HeaderRightContent extends React.PureComponent<HeaderProps> {
  render() {
    const { onMenuClick, currentUser } = this.props;
    const HeaderMenu = (
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

    return (
      <Dropdown overlay={HeaderMenu} className={styles.right}>
        <span>
          <Avatar size="small" src={currentUser.avatar} alt="avatar" />
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </Dropdown>
    );
  }
}
