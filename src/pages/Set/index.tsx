import React from 'react';
import styles from './index.module.scss';
import { Menu } from 'antd';
import { SetState, SetProps } from './index.interface';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';

import { ClickParam } from 'antd/lib/menu';
import { Options } from './Options';
import { Account } from './Account';

const { Item } = Menu;

class Set extends React.Component<SetProps, SetState> {
  static getDerivedStateFromProps(props: SetProps, state: SetState) {
    const { match, location } = props;
    let selectKey = location.pathname.replace(`${match.path}/`, '');
    selectKey = state.menu[selectKey] ? selectKey : 'options';
    if (selectKey !== state.selectKey) {
      return { selectKey };
    }
    return null;
  }

  constructor(props: SetProps) {
    super(props);
    const { match, location } = props;
    const menu = {
      options: 'Options Setting',
      account: 'Account Setting'
    };
    const key = location.pathname.replace(`${match.path}/`, '');
    this.state = {
      menu,
      selectKey: key || 'options'
    };
  }

  selectKey = ({ key }: ClickParam) => {
    const { history } = this.props;
    history.push(`/settings/${key}`);
    this.setState({
      selectKey: key
    });
  };

  getmenu = () => {
    const { menu } = this.state;
    return Object.keys(menu).map(item => <Item key={item}>{menu[item]}</Item>);
  };

  render() {
    const { selectKey, menu } = this.state;

    return (
      <div className={styles['main']}>
        <div className={styles['left-menu']}>
          <Menu
            selectedKeys={[selectKey]}
            mode="inline"
            onClick={this.selectKey}
          >
            {this.getmenu()}
          </Menu>
        </div>
        <div className={styles['right-content']}>
          <div className={styles['title']}>{menu[selectKey]}</div>
          <div className={styles['view']}>
            <Route path="/settings/options" exact component={Options} />
            <Route path="/settings/account" exact component={Account} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Set);
