import React from 'react';
import { Query } from 'react-apollo';
import { GET_INFO } from './query';
import { PageLoading } from '@/components/PageLoading';
import { Alert } from 'antd';
import { ContentLayout } from './Layout';

export interface User {
  name: string;
  username: string;
  password: string;
  slogan: string;
  gravatar: string;
}

class AuthQuery extends Query<{ getInfo: User }> {}

const BaseLayout = () => (
  <AuthQuery query={GET_INFO}>
    {({ data, loading, error }) => {
      if (loading) {
        return <PageLoading />;
      }

      if (error) {
        return (
          <Alert
            message="Error Text"
            description={error.message}
            type="error"
            closable
          />
        );
      }

      return <ContentLayout useInfo={data} />;
    }}
  </AuthQuery>
);

export default BaseLayout;
