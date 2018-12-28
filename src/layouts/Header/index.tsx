import React from 'react';
import { Layout, Icon } from 'antd';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

export const Header = ({ collapsed, toggle }: HeaderProps) => {
  return (
    <>
      <AntHeader style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />
      </AntHeader>
    </>
  );
};
