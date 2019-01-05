import React from 'react';
import Button, { ButtonProps } from 'antd/lib/button';
import { ApolloConsumer } from 'react-apollo';
import ApolloClient, { QueryOptions } from 'apollo-client';

type LoginButtonProps = {
  login: (e: React.MouseEvent, client: ApolloClient<any>) => void;
} & ButtonProps;

export const LoginButton = ({ onClick, login, ...props }: LoginButtonProps) => (
  <ApolloConsumer>
    {client => (
      <Button {...props} onClick={(e: React.MouseEvent) => login(e, client)}>
        Login
      </Button>
    )}
  </ApolloConsumer>
);
