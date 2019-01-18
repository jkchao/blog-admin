import React from 'react';
import { Query } from 'react-apollo';
import { GET_INFO } from './index.query';
import { PageLoading } from '@/components/PageLoading';
import { notification } from 'antd';
import { ContentLayout } from './Layout';
import { ResponseData } from './index.interface';

const BaseLayout = () => (
  <Query<ResponseData> query={GET_INFO} errorPolicy="all">
    {({ data, loading, error }) => {
      if (loading) {
        return <PageLoading />;
      }

      if (error) {
        notification.error({
          message: 'GraphQL error',
          description: error.message,
          duration: 5
        });
      }

      return <ContentLayout useInfo={data} />;
    }}
  </Query>
);

export default BaseLayout;
