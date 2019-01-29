import { Divider, notification, Popconfirm, Table } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import Column from 'antd/lib/table/Column';
import React from 'react';
import { Query } from 'react-apollo';

import { MutationComponent } from '@/components/Mutation';
import { RadioSelect } from '@/components/RadioSelect';
import { TextButton } from '@/components/TextButton';

import {
  QueryVariables,
  ResponseData,
  TagsItem,
  TagsState
} from './index.interface';
import { CREATE_TAG, DELETE_TAG, UPDATE_TAG } from './index.mutation';
import { GET_TAGS } from './index.query';
import { TagModal } from './TagModal';

// TODO:拖拽排序

export default class Tags extends React.PureComponent<{}, TagsState> {
  state = {
    offset: 0,
    limit: 10,
    keyword: '',
    title: 'Create' as 'Create',
    visible: false,
    mutation: CREATE_TAG,
    name: '',
    descript: ''
    // sort: [],
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

  handleClick = () => {
    this.setState({
      visible: true,
      title: 'Create',
      name: '',
      descript: '',
      mutation: CREATE_TAG
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  updateRecord = ({ _id, name, descript }: TagsItem) => {
    this.setState({
      visible: true,
      title: 'Update',
      mutation: UPDATE_TAG,
      _id,
      name,
      descript
    });
  };

  render() {
    const { offset, limit, keyword, ...rest } = this.state;
    return (
      <div>
        <RadioSelect
          typeList={[]}
          onSearch={this.search}
          handleClick={this.handleClick}
        />

        <div className="content">
          <Query<ResponseData, QueryVariables>
            query={GET_TAGS}
            variables={{ offset, limit, keyword }}
            notifyOnNetworkStatusChange
          >
            {({ data, loading, networkStatus, refetch }) => {
              const result = (data && data.getTags) || { docs: [], total: 0 };

              const pagination: PaginationProps = {
                total: result.total,
                pageSize: limit,
                onChange: this.pageChange,
                showTotal: total => `共 ${total} 条`
              };

              return (
                <>
                  <Table<TagsItem>
                    dataSource={result.docs}
                    loading={loading || networkStatus === 4}
                    rowKey="_id"
                    pagination={pagination}
                  >
                    <Column
                      key="name"
                      title="Name"
                      dataIndex="name"
                      width="300px"
                    />
                    <Column
                      key="descript"
                      title="descript"
                      dataIndex="descript"
                    />

                    <Column key="count" title="Count" dataIndex="count" />

                    <Column
                      title="Action"
                      key="action"
                      width="200px"
                      render={(text, record: TagsItem) => {
                        return (
                          <>
                            <TextButton
                              onClick={() => this.updateRecord(record)}
                            >
                              edit
                            </TextButton>

                            <Divider type="vertical" />
                            <MutationComponent<{}, { _id: string }>
                              mutation={DELETE_TAG}
                              refetch={refetch}
                              ItemName={/^TagsItem/}
                            >
                              {(mutation, loading) => (
                                <Popconfirm
                                  title="Sure to delete?"
                                  onConfirm={() =>
                                    mutation({
                                      variables: { _id: record._id }
                                    })
                                  }
                                >
                                  <TextButton disabled={loading}>
                                    delete
                                  </TextButton>
                                </Popconfirm>
                              )}
                            </MutationComponent>
                          </>
                        );
                      }}
                    />
                  </Table>

                  <TagModal
                    handleCancel={this.handleCancel}
                    refetch={refetch}
                    handleError={this.handleError}
                    {...rest}
                  />
                </>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}
