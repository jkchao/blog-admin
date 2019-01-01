import React from 'react';

import { Layout } from 'antd';
import { Header, CurrentUser } from '../Header';
import { BaseMenu } from '../Menu';
import { BaseRouters } from '@/router';
import { Menus } from '@/router/config';
import { Location } from 'history';
import { urlToList } from '@/utils';
import logo from '@/assets/images/logo.png';

import styles from './index.module.scss';

const { Sider, Content } = Layout;

type BaseLayoutProps = {
  location: Location;
};

type BaseLayoutState = {
  collapsed: boolean;
  currentUser: CurrentUser;
};

export default class BaseLayout extends React.Component<
  BaseLayoutProps,
  BaseLayoutState
> {
  state = {
    collapsed: false,
    currentUser: {
      name: 'jkchao',
      avatar:
        'https://static.jkchao.cn/DB4EAD57ED7554C1602B27807B386087.png?imageView2/1/w/36/h/36'
    }
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  onMenuClick = () => {
    // ..
  };

  render() {
    const {
      location: { pathname }
    } = this.props;

    const { collapsed, currentUser } = this.state;

    const openKeys = urlToList(pathname)[0];

    const props: {
      selectedKeys: string[];
      openKeys?: string[];
    } = {
      selectedKeys: [pathname]
    };

    // menu  默认两级 route
    if (openKeys !== pathname) {
      props.openKeys = [openKeys];
    }
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: 'auto',
            height: '100vh'
          }}
        >
          <div className={styles.logo}>
            <img src={logo} alt="" />
            {!this.state.collapsed && <span>后台管理</span>}
          </div>
          <BaseMenu menu={Menus} theme="dark" mode="inline" {...props} />
        </Sider>
        <Layout>
          <Header
            collapsed={this.state.collapsed}
            toggle={this.toggle}
            currentUser={currentUser}
            onMenuClick={this.onMenuClick}
          />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff'
            }}
          >
            <BaseRouters />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
