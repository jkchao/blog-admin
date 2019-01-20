import gql from 'graphql-tag';

export const UPDATE_OPTIONS = gql`
  mutation updateOptions(
    $_id: ObjectId!
    $title: String
    $sub_title: String
    $keyword: String
    $descript: String
    $url: String
    $email: String
    $icp: String
  ) {
    updateOptions(
      optionsInfo: {
        _id: $_id
        title: $title
        sub_title: $sub_title
        keyword: $keyword
        descript: $descript
        url: $url
        email: $email
        icp: $icp
      }
    ) {
      _id
      sub_title
      title
      email
      icp
      descript
      keyword
      url
    }
  }
`;
