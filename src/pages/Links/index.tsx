import React from 'react';
import { RadioSelect } from '@/components/RadioSelect';
import { Table, notification, Divider, Popconfirm } from 'antd';
import { Query, Mutation } from 'react-apollo';
import { GET_LINKS } from './query';
import { PaginationProps } from 'antd/lib/pagination';
import { DELETE_LINK, CREATE_LINK } from './mutation';
import Column from 'antd/lib/table/Column';
import { DeleteLink } from './DeleteLink';
import { CreateLink } from './CreateLink';
import { Omit } from 'antd/lib/_util/type';

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
}

export default class Links extends React.Component<{}, LinksState> {
  state = {
    offset: 0,
    limit: 10,
    keyword: '',
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
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { offset, limit, keyword, visible } = this.state;
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
                            <a href="javascript:;">edit</a>
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

                  <CreateLink
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
