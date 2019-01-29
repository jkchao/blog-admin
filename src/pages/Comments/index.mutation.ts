import gql from 'graphql-tag';

export const UPDATE_COMMENT = gql`
  mutation updateComment($_id: ObjectID!, $state: State) {
    updateComment(commentInfo: { _id: $_id, state: $state }) {
      _id
      state
      name
      content
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($_id: ObjectID!) {
    deleteComment(_id: $_id) {
      message
    }
  }
`;
