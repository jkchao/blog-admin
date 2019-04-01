import gql from 'graphql-tag';

export const GET_ARTICLE = gql`
  query getArticle(
    $offset: Float!
    $limit: Float!
    $keyword: String
    $state: State
  ) {
    getArticles(
      offset: $offset
      limit: $limit
      keyword: $keyword
      state: $state
    ) {
      total
      limit
      offset
      docs {
        _id
        title
        state
        tag
        publish
        keyword
        descript
        type
        create_at
      }
    }
  }
`;
