import gql from 'graphql-tag';

export const GET_INFO = gql`
  query {
    getInfo {
      name
      username
      slogan
      gravatar
    }
  }
`;
