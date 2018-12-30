import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Menus } from './config';
import { NotFound } from '@/pages/404';
import { PageLoading } from '@/components/PageLoading';

export const Routers = () => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      {Menus.map(menu => {
        const route = (r: typeof menu) => (
          <Route key={r.path} path={r.path} exact component={r.component} />
        );
        return menu.component
          ? route(menu)
          : menu.subMenu.map(item => route(item));
      })}

      <Route component={NotFound} />
    </Switch>
  </Suspense>
);
