import React from 'react';
import { Layout, Icon } from 'antd';

const { Header: AntHeader } = Layout;
import styles from './index.module.scss';
import { HeaderRightContent } from './HeaderRightContent';
import { HeaderProps } from './index.interface';

export const Header = ({ collapsed, toggle, ...rest }: HeaderProps) => {
  return (
    <AntHeader className={styles.header}>
      <Icon
        className={styles.trigger}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggle}
      />

      <HeaderRightContent {...rest} />
    </AntHeader>
  );
};
