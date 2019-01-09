import gql from 'graphql-tag';

export const DELETE_LINK = gql`
  mutation deleteLink($_id: ObjectID!) {
    deleteLink(_id: $_id) {
      message
    }
  }
`;
