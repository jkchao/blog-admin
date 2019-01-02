import React, { Suspense, ErrorInfo } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import BaseLayout from './layouts/BaseLayout';
import { PageLoading } from './components/PageLoading';
import { AuthRoute } from './router/auth';
import './App.css';
import './assets/scss/index.scss';
import { notification } from 'antd';

export class App extends React.PureComponent {
  componentDidCatch(error: Error, info: ErrorInfo) {
    notification.error({
      message: 'something was error',
      description: info.componentStack,
      duration: 5
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<PageLoading />}>
          <Switch>
            <Route path="/login" exact component={Login} />
            <AuthRoute path="/" component={BaseLayout} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}
