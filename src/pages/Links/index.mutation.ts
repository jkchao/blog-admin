import gql from 'graphql-tag';

export const DELETE_LINK = gql`
  mutation deleteLink($_id: ObjectID!) {
    deleteLink(_id: $_id) {
      message
    }
  }
`;

export const CREATE_LINK = gql`
  mutation createLink($url: String!, $name: String!) {
    createLink(linkInfo: { url: $url, name: $name }) {
      _id
      url
      name
    }
  }
`;

export const UPDATE_LINK = gql`
  mutation updateLink($_id: ObjectID!, $url: String, $name: String) {
    updateLink(linkInfo: { _id: $_id, url: $url, name: $name }) {
      _id
      url
      name
    }
  }
`;
