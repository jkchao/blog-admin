import React from 'react';
import { RadioSelect } from '@/components/RadioSelect';
import { Table, notification, Divider, Popconfirm } from 'antd';
import { Query } from 'react-apollo';
import { GET_LINKS } from './query';
import { PaginationProps } from 'antd/lib/pagination';
import { DELETE_LINK, CREATE_LINK } from './mutation';
import Column from 'antd/lib/table/Column';
import { DeleteLink } from './DeleteLink';
import { LinkModel } from './LinkModel';

export interface LinksItem {
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
  visible: boolean;
  title: 'Create' | 'Update';
}

export default class Links extends React.Component<{}, LinksState> {
  state = {
    offset: 0,
    limit: 10,
    keyword: '',
    title: 'Create' as 'Create',
    visible: false
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
      title: 'Create'
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
      title: 'Update'
    });
  };

  render() {
    const { offset, limit, keyword, visible, title } = this.state;
    return (
      <div>
        <RadioSelect
          typeList={[]}
          onSearch={this.search}
          handleClick={this.handleClick}
        />

        <div className="content">
          <Query<Response>
            query={GET_LINKS}
            variables={{ offset, limit, keyword }}
            notifyOnNetworkStatusChange
          >
            {({ data, loading, error, networkStatus, refetch }) => {
              error && this.handleError(error.message);

              const result = (data && data.getLinks) || { docs: [], total: 0 };

              const pagination: PaginationProps = {
                total: result.total,
                pageSize: limit,
                onChange: this.pageChange
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
                    <Column key="url" title="Url" dataIndex="url" />

                    <Column
                      title="Action"
                      key="action"
                      width="300px"
                      render={(text, record: LinksItem) => {
                        return (
                          <>
                            <a
                              href="javascript:;"
                              onClick={() => this.updateRecord(record)}
                            >
                              edit
                            </a>
                            <Divider type="vertical" />
                            <DeleteLink
                              record={record}
                              refetch={refetch}
                              mutation={DELETE_LINK}
                              handleError={this.handleError}
                            />
                          </>
                        );
                      }}
                    />
                  </Table>

                  <LinkModel
                    title={title}
                    visible={visible}
                    handleCancel={this.handleCancel}
                    mutation={CREATE_LINK}
                    refetch={refetch}
                    handleError={this.handleError}
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
