import React from 'react';
import { Layout, Icon } from 'antd';

const { Header: AntHeader } = Layout;
import styles from './index.module.scss';
import { HeaderRightContent } from './HeaderRightContent';

export interface CurrentUser {
  avatar: string;
  name: string;
}
interface HeaderProps {
  collapsed: boolean;
  currentUser: CurrentUser;
  toggle: () => void;
  onMenuClick: () => void;
}

export const Header = ({ collapsed, toggle, ...rest }: HeaderProps) => {
  return (
    <>
      <AntHeader style={{ background: '#fff', padding: 0 }}>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />

        <HeaderRightContent {...rest} />
      </AntHeader>
    </>
  );
};
