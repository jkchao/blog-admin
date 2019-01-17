import gql from 'graphql-tag';

export const GET_OPTIONS = gql`
  query {
    getOptions {
      _id
      sub_title
      title
      meta {
        likes
      }
      email
      icp
      descript
      keyword
    }
  }
`;
