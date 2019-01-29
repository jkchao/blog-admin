import gql from 'graphql-tag';

export const GET_TAGS = gql`
  query getTags($offset: Float!, $limit: Float!, $keyword: String) {
    getTags(offset: $offset, limit: $limit, keyword: $keyword) {
      total
      limit
      offset
      docs {
        _id
        name
        descript
        sort
        count
      }
    }
  }
`;
