import React from 'react';
import { Layout, Icon } from 'antd';

const { Header: AntHeader } = Layout;
import styles from './index.module.scss';
interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

export const Header = ({ collapsed, toggle }: HeaderProps) => {
  return (
    <>
      <AntHeader style={{ background: '#fff', padding: 0 }}>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />
      </AntHeader>
    </>
  );
};
