import gql from 'graphql-tag';

export const UPDATE_ARTICLE = gql`
  mutation updateArticle($_id: ObjectID!, $state: State, $publish: Publish) {
    updateArticle(
      articleInfo: { _id: $_id, state: $state, publish: $publish }
    ) {
      _id
      state
      publish
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation deleteArticle($_id: ObjectID!) {
    deleteArticle(_id: $_id) {
      message
    }
  }
`;
