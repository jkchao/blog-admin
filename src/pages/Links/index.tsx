import React from 'react';
import { RadioSelect } from '@/components/RadioSelect';
import { Table, notification, Divider, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Query, Mutation } from 'react-apollo';
import { GET_LINKS } from './query';
import { PaginationProps } from 'antd/lib/pagination';
import { DELETE_LINK } from './mutation';
import Column from 'antd/lib/table/Column';

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
  // columns: ColumnProps<LinksItem>[];

  constructor(props: {}) {
    super(props);
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

  handleDelete = (id: string) => {
    // ..
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
                  dataSource={result.docs}
                  loading={loading}
                  rowKey="_id"
                  pagination={pagination}
                >
                  <Column
                    key="name"
                    title="Name"
                    dataIndex="name"
                    width="300px"
                  />
                  <Column key="url" title="Url" dataIndex="url" />

                  <Column
                    title="Action"
                    key="action"
                    width="300px"
                    render={(text, record: LinksItem) => {
                      const quert = [
                        {
                          query: GET_LINKS,
                          variables: { offset, limit, keyword }
                        }
                      ];
                      return (
                        <span>
                          <a href="javascript:;">edit</a>
                          <Divider type="vertical" />
                          <Mutation
                            mutation={DELETE_LINK}
                            refetchQueries={quert}
                          >
                            {(deleteLink, { loading, error }) => {
                              error && console.log('error');
                              return (
                                // tslint:disable-next-line:max-line-length
                                <Popconfirm
                                  title="Sure to delete?"
                                  onConfirm={() =>
                                    deleteLink({
                                      variables: { _id: record._id }
                                    })
                                  }
                                >
                                  <a href="javascript:;">Delete</a>
                                </Popconfirm>
                              );
                            }}
                          </Mutation>
                        </span>
                      );
                    }}
                  />
                </Table>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}
