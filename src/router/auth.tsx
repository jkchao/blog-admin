import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { checkLogin } from '@/utils';

// RouteProps 的 component 有问题，需要覆盖掉
type Props = {
  component: typeof React.Component;
} & RouteProps;

export const AuthRoute = ({ component: Component, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={props =>
        checkLogin() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
