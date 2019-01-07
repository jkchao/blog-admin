import gql from 'graphql-tag';

export const GET_LINKS = gql`
  query getLinks($offset: Float!, $limit: Float!) {
    getLinks(offset: $offset, limit: $limit) {
      total
      limit
      offset
      docs {
        _id
        url
        name
      }
    }
  }
`;
