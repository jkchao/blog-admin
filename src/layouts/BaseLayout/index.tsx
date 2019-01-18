import React from 'react';
import { Query } from 'react-apollo';
import { GET_INFO } from './index.query';
import { notification, Spin } from 'antd';
import { ContentLayout } from './Layout';
import { ResponseData } from './index.interface';

const BaseLayout = () => (
  <Query<ResponseData> query={GET_INFO} errorPolicy="all">
    {({ data }) => {
      return <ContentLayout useInfo={data || {}} />;
    }}
  </Query>
);

export default BaseLayout;
