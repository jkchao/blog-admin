import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const httpLink = createHttpLink({
  uri: process.env.REACT_APOLLO_PATH
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});
