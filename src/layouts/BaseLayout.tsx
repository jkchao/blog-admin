import React from 'react';

import { Layout } from 'antd';
import { Header } from './Header';
import { BaseMenu } from './Menu';
import { BaseRouters } from '@/router';
import { Menus } from '@/router/config';
import { Location } from 'history';
import { urlToList } from '@/utils';

const { Sider, Content } = Layout;

type BaseLayoutProps = {
  location: Location;
};

type BaseLayoutState = {
  collapsed: boolean;
};

export default class BaseLayout extends React.Component<
  BaseLayoutProps,
  BaseLayoutState
> {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const {
      location: { pathname }
    } = this.props;
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
          collapsed={this.state.collapsed}
          style={{
            overflow: 'auto',
            height: '100vh'
          }}
        >
          <div className="logo" />
          <BaseMenu
            menu={Menus}
            theme="dark"
            mode="inline"
            {...props}
            // selectedKeys={[pathname]}
            // openKeys={[]}
          />
        </Sider>
        <Layout>
          <Header collapsed={this.state.collapsed} toggle={this.toggle} />
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
