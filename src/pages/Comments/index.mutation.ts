import gql from 'graphql-tag';

export const UPDATE_COMMENT = gql`
  mutation updateComment(
    $_id: ObjectID!
    $state: State
    $content: String
    $author: AuthorInput
  ) {
    updateComment(
      commentInfo: {
        _id: $_id
        state: $state
        content: $content
        author: $author
      }
    ) {
      _id
      state
      content
      author {
        name
        site
        email
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($_id: ObjectID!, $post_id: Float!) {
    deleteComment(_id: $_id, post_id: $post_id) {
      message
    }
  }
`;
