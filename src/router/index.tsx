import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Menus } from './config';

export const Routers = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      {Menus.map(menu => {
        const route = (r: typeof menu) => (
          <Route
            key={menu.key}
            path={menu.key}
            exact
            component={menu.component}
          />
        );
        return menu.subMenu
          ? menu.subMenu.map(item => route(item))
          : route(menu);
      })}
    </Switch>
  </Suspense>
);
