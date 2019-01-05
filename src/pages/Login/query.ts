import gql from 'graphql-tag';

export const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      lifeTime
      token
    }
  }
`;
