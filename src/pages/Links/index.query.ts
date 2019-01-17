import gql from 'graphql-tag';

export const GET_LINKS = gql`
  query getLinks($offset: Float!, $limit: Float!, $keyword: String) {
    getLinks(offset: $offset, limit: $limit, keyword: $keyword) {
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
