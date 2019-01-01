import React, { Suspense } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import BaseLayout from './layouts/BaseLayout';
import { PageLoading } from './components/PageLoading';
import { AuthRoute } from './router/auth';
import './App.css';
import './assets/scss/index.scss';

export const App = () => (
  <BrowserRouter>
    <Suspense fallback={<PageLoading />}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <AuthRoute path="/" component={BaseLayout} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);
