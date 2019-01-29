import gql from 'graphql-tag';

export const GET_COMMENTS = gql`
  query getComments(
    $offset: Float!
    $limit: Float!
    $keyword: String
    $state: State
  ) {
    getComments(
      offset: $offset
      limit: $limit
      keyword: $keyword
      state: $state
    ) {
      total
      limit
      offset
      docs {
        id
        _id
        post_id
        pid
        content
        state
        likes
        ip
        city
        range
        country
        agent
        update_at
        create_at
        author {
          name
          site
          email
        }
      }
    }
  }
`;
