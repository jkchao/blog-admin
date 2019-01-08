import React from 'react';
import { RadioSelect } from '@/components/RadioSelect';
import { Table, notification } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Query } from 'react-apollo';
import { GET_LINKS } from './query';
import { PaginationProps } from 'antd/lib/pagination';

interface LinksItem {
  _id: string;
  name: string;
  url: string;
}

interface Response {
  getLinks: {
    limit: number;
    total: number;
    offset: number;
    docs: LinksItem[];
  };
}

interface LinksState {
  offset: number;
  limit: number;
  keyword: string;
}

export default class Links extends React.Component<{}, LinksState> {
  state = {
    offset: 0,
    limit: 10,
    keyword: ''
  };
  columns: ColumnProps<LinksItem>[];

  constructor(props: {}) {
    super(props);

    this.columns = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        width: 300
      },
      {
        key: 'url',
        title: 'Url',
        dataIndex: 'url'
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 200,
        render: () => <a href="javascript:;">编辑</a>
      }
    ];
  }

  pageChange = (page: number) => {
    this.setState({
      offset: Number(`${(page - 1) * 10}`)
    });
  };

  search = (keyword: string) => {
    this.setState({
      keyword
    });
  };

  render() {
    const { offset, limit, keyword } = this.state;
    return (
      <div>
        <RadioSelect typeList={[]} onSearch={this.search} hasAddBtn />

        <div className="content">
          <Query<Response>
            query={GET_LINKS}
            variables={{ offset, limit, keyword }}
          >
            {({ data, loading, error }) => {
              error &&
                notification.error({
                  message: 'GraphQL error',
                  description: error.message,
                  duration: 5
                });

              const result = (data && data.getLinks) || { docs: [], total: 0 };

              const pagination: PaginationProps = {
                total: result.total,
                pageSize: limit,
                onChange: this.pageChange
              };

              return (
                <Table<LinksItem>
                  columns={this.columns}
                  dataSource={result.docs}
                  loading={loading}
                  rowKey="_id"
                  pagination={pagination}
                />
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}
