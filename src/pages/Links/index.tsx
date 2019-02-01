import { Divider, notification, Popconfirm, Table } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import Column from 'antd/lib/table/Column';
import React from 'react';
import { Query } from 'react-apollo';

import { RadioSelect } from '@/components/RadioSelect';

import {
  LinksItem,
  LinksState,
  ResponseData,
  QueryVariables
} from './index.interface';
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
    mutation: CREATE_LINK,
    name: '',
    url: ''
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

  updateRecord = ({ _id, name, url }: LinksItem) => {
    this.setState({
      visible: true,
      title: 'Update',
      mutation: UPDATE_LINK,
      _id,
      name,
      url
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
                      render={text => (
                        <a href={text} target="_blank">
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
                            <MutationComponent<{}, { _id: string }>
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
