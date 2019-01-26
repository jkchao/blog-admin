import gql from 'graphql-tag';

// @client 表示从本地读取数据

export const GET_INFO = gql`
  query {
    getInfo @client {
      _id
      name
      username
      slogan
      gravatar
    }
  }
`;

export const GET_QINIU = gql`
  query {
    getQiniu {
      token
    }
  }
`;
