import React from 'react';
import { RadioSelect } from '@/components/RadioSelect';
import { Table, notification } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Query } from 'react-apollo';
import { GET_LINKS } from './query';

interface LinksItem {
  _id: string;
  name: string;
  url: string;
}

const columns: ColumnProps<LinksItem>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name'
  },
  {
    key: 'url',
    title: 'Url',
    dataIndex: 'url'
  }
];

interface Response {
  getLinks: {
    limit: number;
    total: number;
    offset: number;
    docs: LinksItem[];
  };
}

export default class Links extends React.Component {
  state = {
    offset: 0,
    limit: 10
  };

  render() {
    const { offset, limit } = this.state;
    return (
      <div>
        <RadioSelect typeList={[]} hasSearch />

        <Query<Response> query={GET_LINKS} variables={{ offset, limit }}>
          {({ data, loading, error }) => {
            error &&
              notification.error({
                message: 'GraphQL error',
                description: error.message,
                duration: 5
              });

            const result = (data && data.getLinks) || { docs: [], total: 0 };
            const pagination = { total: result.total, pageSize: limit };

            return (
              <Table<LinksItem>
                columns={columns}
                dataSource={result.docs}
                loading={loading}
                rowKey="_id"
                pagination={pagination}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}
