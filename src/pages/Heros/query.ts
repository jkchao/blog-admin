import gql from 'graphql-tag';

export const GET_HEROS = gql`
  query getHeros(
    $offset: Float!
    $limit: Float!
    $keyword: String
    $state: State
  ) {
    getHeros(offset: $offset, limit: $limit, keyword: $keyword, state: $state) {
      total
      limit
      offset
      docs {
        _id
        state
        name
        content
        agent
        country
        range
        city
        create_at
      }
    }
  }
`;
