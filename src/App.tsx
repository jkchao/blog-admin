import React from 'react';
import './App.css';

import { Layout } from 'antd';
import { Header } from './layouts/Header';
import { Menu } from './layouts/Menu';

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
          <Menu />
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
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
