import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Menus } from './config';
import { NotFound } from '@/pages/404';
import { PageLoading } from '@/components/PageLoading';

export const BaseRouters = () => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      <Redirect from="/" to={Menus[0].path} exact />

      {Menus.map(menu => {
        const route = ({ component: Component, path, title }: typeof menu) => (
          <Route key={title} path={path} component={Component} />
        );
        return menu.component
          ? route(menu)
          : // TODO: fix it
            // @ts-ignore
            menu.subMenu.map(item => route(item));
      })}

      <Route component={NotFound} />
    </Switch>
  </Suspense>
);
