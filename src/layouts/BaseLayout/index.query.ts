import gql from 'graphql-tag';

export const GET_INFO = gql`
  query {
    getInfo {
      _id
      name
      username
      slogan
      gravatar
    }
  }
`;
