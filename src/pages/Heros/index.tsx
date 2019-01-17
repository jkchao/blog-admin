import { Divider, notification, Popconfirm, Table } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { RadioChangeEvent } from 'antd/lib/radio';
import Column from 'antd/lib/table/Column';
import ApolloClient from 'apollo-client';
import dayjs from 'dayjs';
import React from 'react';
import { Query } from 'react-apollo';

import { MutationComponent } from '@/components/Mutation';
import { RadioSelect } from '@/components/RadioSelect';

import { ExandedRowRender } from './ExpandedRowRender';
import { HerosItem, HerosState, Response } from './index.interface';
import { UPDATE_HERO, DELETE_HERO } from './index.mutation';
import { GET_HEROS } from './index.query';
import { HerosMutations } from './HerosMutations';
import { TypeList } from '@/components/RadioSelect/index.interface';

export default class Heros extends React.Component<{}, HerosState> {
  state = {
    offset: 0,
    limit: 10,
    keyword: '',
    state: 'TODO' as 'TODO'
  };

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

  handleError = (message: string) => {
    notification.error({
      message: 'GraphQL error',
      description: message,
      duration: 5
    });
  };

  onChange = (e: RadioChangeEvent, typeName: string) => {
    console.log(e.target.value, typeName);
    this.setState({
      [typeName]: e.target.value
    });
  };

  updateHeros = async (
    client: ApolloClient<any>,
    record: HerosItem,
    state: string
  ) => {
    const result = await client.mutate({
      mutation: UPDATE_HERO,
      variables: {
        _id: record._id,
        state
      }
    });
    console.log(result);
  };

  render() {
    const { offset, limit, keyword, state } = this.state;

    const typeList: TypeList[] = [
      {
        name: '状态',
        typeName: 'state',
        list: [
          { name: '待审核', id: 'TODO' },
          { name: '审核通过', id: 'SUCCESS' },
          { name: '审核不通过', id: 'FAIL' }
        ],
        defaultValue: 'TODO'
      }
    ];

    return (
      <div>
        <RadioSelect
          typeList={typeList}
          onSearch={this.search}
          onChange={this.onChange}
        />

        <div className="content">
          <Query<Response>
            query={GET_HEROS}
            variables={{ offset, limit, keyword, state }}
            notifyOnNetworkStatusChange
          >
            {({ data, loading, error, networkStatus, refetch, client }) => {
              error && this.handleError(error.message);

              const result = (data && data.getHeros) || { docs: [], total: 0 };

              const pagination: PaginationProps = {
                total: result.total,
                pageSize: limit,
                onChange: this.pageChange,
                showTotal: total => `共 ${total} 条`
              };

              return (
                <>
                  <Table<HerosItem>
                    dataSource={result.docs}
                    loading={loading || networkStatus === 4}
                    rowKey="_id"
                    pagination={pagination}
                    expandedRowRender={ExandedRowRender}
                  >
                    <Column key="name" title="Name" dataIndex="name" />
                    <Column
                      key="create_at"
                      title="Create_at"
                      dataIndex="create_at"
                      width="200px"
                      render={text => dayjs(text).format('YYYY-MM-DD hh:mm:ss')}
                    />
                    <Column
                      key="state"
                      title="State"
                      dataIndex="state"
                      width="100px"
                    />

                    <Column
                      title="Action"
                      key="action"
                      width="200px"
                      render={(text, record: HerosItem) => {
                        return (
                          <>
                            {record.state !== 'SUCCESS' && (
                              <HerosMutations
                                mutation={UPDATE_HERO}
                                refetch={refetch}
                                ItemName={/^HerosItem/}
                                variables={{
                                  _id: record._id,
                                  state: 'SUCCESS'
                                }}
                                text="通 过"
                              />
                            )}
                            {record.state === 'TODO' && (
                              <Divider type="vertical" />
                            )}

                            {record.state !== 'FAIL' && (
                              <HerosMutations
                                mutation={UPDATE_HERO}
                                refetch={refetch}
                                ItemName={/^HerosItem/}
                                variables={{
                                  _id: record._id,
                                  state: 'FAIL'
                                }}
                                text="不通过"
                              />
                            )}
                            <Divider type="vertical" />
                            <MutationComponent
                              mutation={DELETE_HERO}
                              refetch={refetch}
                              ItemName={/^HerosItem/}
                            >
                              {mutation => (
                                <Popconfirm
                                  title="Sure to delete?"
                                  onConfirm={() =>
                                    mutation({
                                      variables: { _id: record._id }
                                    })
                                  }
                                >
                                  <a href="javascript:;">删 除</a>
                                </Popconfirm>
                              )}
                            </MutationComponent>
                          </>
                        );
                      }}
                    />
                  </Table>
                </>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}
