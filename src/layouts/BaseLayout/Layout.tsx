import React, { PureComponent } from 'react';

import { Layout } from 'antd';
import { Header } from '../Header';
import { BaseMenu } from '../Menu';
import { BaseRouters } from '@/router';
import { Menus } from '@/router/config';
import { urlToList } from '@/utils';
import logo from '@/assets/images/logo.png';

import styles from './index.module.scss';

import { ClickParam } from 'antd/lib/menu';
import { RouteComponentProps, withRouter } from 'react-router';
import { BreadcrumbView } from '@/components/Breadcrumb';
import { User } from '.';

const { Sider, Content } = Layout;

interface BaseLayoutProps extends RouteComponentProps {
  useInfo?: {
    getInfo?: User;
  };
}

interface BaseLayoutState {
  collapsed: boolean;
  currentUser?: User;
}

class PageLayout extends PureComponent<BaseLayoutProps, BaseLayoutState> {
  state = {
    collapsed: false,
    currentUser: {} as User
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  onMenuClick = ({ key }: ClickParam) => {
    if (key === 'set') {
      this.props.history.push('/set');
    } else {
      window.localStorage.setItem('TOKEN', JSON.stringify('{}'));
      this.props.history.push('login', {
        from: this.props.location
      });
    }
  };

  render() {
    const {
      location: { pathname },
      useInfo
    } = this.props;

    const { collapsed } = this.state;

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
            currentUser={useInfo && useInfo.getInfo}
            onMenuClick={this.onMenuClick}
          />
          <BreadcrumbView />
          <Content className={styles.content}>
            <BaseRouters />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export const ContentLayout = withRouter(PageLayout);
