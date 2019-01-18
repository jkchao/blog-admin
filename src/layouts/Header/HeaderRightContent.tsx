import React from 'react';
import { Menu, Icon, Dropdown, Avatar } from 'antd';
import styles from './index.module.scss';
import { ClickParam } from 'antd/lib/menu';
import { User } from '../BaseLayout/index.interface';

interface HeaderProps {
  onMenuClick: (param: ClickParam) => void;
  currentUser?: User;
}

export class HeaderRightContent extends React.PureComponent<HeaderProps> {
  render() {
    const {
      onMenuClick,
      currentUser = { username: 'jkchao', gravatar: '' }
    } = this.props;

    const HeaderMenu = (
      <Menu className={styles.menu} onClick={onMenuClick}>
        <Menu.Item key="set">
          <Icon type="setting" />
          <span>settings</span>
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <span>logout</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={HeaderMenu} className={styles.right}>
        <span>
          <Avatar size="small" src={currentUser.gravatar} alt="avatar" />
          <span className={styles.name}>{currentUser.username}</span>
        </span>
      </Dropdown>
    );
  }
}
