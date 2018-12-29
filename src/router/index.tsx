import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Menus } from './config';

export const Routers = () => (
  <Switch>
    {Menus.map(menu => (
      <Route key={menu.key} path={menu.key} exact component={menu.component} />
    ))}
  </Switch>
);
