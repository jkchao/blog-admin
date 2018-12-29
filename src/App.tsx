import React from 'react';
import './App.css';

import { Layout } from 'antd';
import { Header } from './layouts/Header';
import { Menu } from './layouts/Menu';
import { Routers } from './router';
import { Menus } from './router/config';
import { BrowserRouter } from 'react-router-dom';

const { Sider, Content } = Layout;

class App extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <BrowserRouter>
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
            <Menu
              menu={Menus}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
            />
          </Sider>
          <Layout>
            <Header collapsed={this.state.collapsed} toggle={this.toggle} />
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280
              }}
            >
              <Routers />
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
