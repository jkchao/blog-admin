import { Divider, notification, Popconfirm, Table } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import Column from 'antd/lib/table/Column';
import React from 'react';
import { Query } from 'react-apollo';

import { RadioSelect } from '@/components/RadioSelect';

import { LinksItem, LinksState, ResponseData } from './index.interface';
import { LinkModal } from './LinkModal';
import { CREATE_LINK, DELETE_LINK, UPDATE_LINK } from './index.mutation';
import { GET_LINKS } from './index.query';
import { MutationComponent } from '@/components/Mutation';
import { TextButton } from '@/components/TextButton';

export default class Links extends React.PureComponent<{}, LinksState> {
  state = {
    offset: 0,
    limit: 10,
    keyword: '',
    title: 'Create' as 'Create',
    visible: false,
    mutation: CREATE_LINK
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
      url: '',
      mutation: CREATE_LINK
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  updateRecord = (record: LinksItem) => {
    this.setState({
      visible: true,
      title: 'Update',
      mutation: UPDATE_LINK,
      ...record
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
          <Query<ResponseData>
            query={GET_LINKS}
            variables={{ offset, limit, keyword }}
            notifyOnNetworkStatusChange
          >
            {({ data, loading, networkStatus, refetch }) => {
              const result = (data && data.getLinks) || { docs: [], total: 0 };

              const pagination: PaginationProps = {
                total: result.total,
                pageSize: limit,
                onChange: this.pageChange,
                showTotal: total => `共 ${total} 条`
              };

              return (
                <>
                  <Table<LinksItem>
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
                      key="url"
                      title="Url"
                      dataIndex="url"
                      render={(text, record: LinksItem) => (
                        <a href={record.url} target="_blank">
                          {text}
                        </a>
                      )}
                    />

                    <Column
                      title="Action"
                      key="action"
                      width="200px"
                      render={(text, record: LinksItem) => {
                        return (
                          <>
                            <TextButton
                              onClick={() => this.updateRecord(record)}
                            >
                              edit
                            </TextButton>

                            <Divider type="vertical" />
                            <MutationComponent
                              mutation={DELETE_LINK}
                              refetch={refetch}
                              ItemName={/^LinksItem/}
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

                  <LinkModal
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
