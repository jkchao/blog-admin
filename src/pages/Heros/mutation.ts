import gql from 'graphql-tag';

export const UPDATE_HERO = gql`
  mutation updateHero($_id: ObjectID!, $state: State) {
    updateHero(heroInfo: { _id: $_id, state: $state }) {
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
`;
