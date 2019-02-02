import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { notification } from 'antd';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_PATH
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

    notification.error({
      message: 'GraphQL error',
      description:
        (graphQLErrors[0].message && graphQLErrors[0].message.message) ||
        graphQLErrors[0].message ||
        '未知错误',
      duration: 5
    });
  } else if (networkError) {
    notification.error({
      message: 'Network error',
      description: networkError.message,
      duration: 5
    });
  }
});

const authLink = setContext((_, { headers }) => {
  const store = JSON.parse(window.localStorage.getItem('TOKEN') || '{}');
  return {
    headers: {
      ...headers,
      authorization: store.token ? `Bearer ${store.token}` : ''
    }
  };
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    dataIdFromObject: (object: { id?: string; _id?: string }) =>
      object._id || object.id
  })
});
