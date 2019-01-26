import gql from 'graphql-tag';

export const UPDATE_INFO = gql`
  mutation updateUserInfo(
    $_id: ObjectId!
    $oldPassword: String!
    $password: String
    $slogan: String
    $gravatar: String
    $name: String
  ) {
    updateUserInfo(
      userInfo: {
        _id: $_id
        oldPassword: $oldPassword
        password: $password
        slogan: $slogan
        gravatar: $gravatar
        name: $name
      }
    ) {
      _id
      slogan
      username
      name
      gravatar
    }
  }
`;
