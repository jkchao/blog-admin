import gql from 'graphql-tag';

export const UPDATE_HERO = gql`
  mutation updateHero($_id: ObjectID!, $state: State) {
    updateHero(heroInfo: { _id: $_id, state: $state }) {
      _id
      state
      name
      content
    }
  }
`;

export const DELETE_HERO = gql`
  mutation deleteHero($_id: ObjectID!) {
    deleteHero(_id: $_id) {
      message
    }
  }
`;
