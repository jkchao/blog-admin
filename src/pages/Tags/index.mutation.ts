import gql from 'graphql-tag';

export const DELETE_TAG = gql`
  mutation deleteTag($_id: ObjectID!) {
    deleteTag(_id: $_id) {
      message
    }
  }
`;

export const CREATE_TAG = gql`
  mutation createTag($descript: String!, $name: String!) {
    createTag(tagInfo: { descript: $descript, name: $name }) {
      _id
      name
      descript
      sort
      count
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation updateTag($_id: ObjectID!, $descript: String, $name: String) {
    updateTag(tagInfo: { _id: $_id, descript: $descript, name: $name }) {
      _id
      name
      descript
      sort
      count
    }
  }
`;
