import React from 'react';
import { ButtonProps } from 'antd/lib/button';
import { Button } from 'antd';
import { ApolloConsumer } from 'react-apollo';
import ApolloClient from 'apollo-client';

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
