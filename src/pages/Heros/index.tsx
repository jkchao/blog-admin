import { Divider, notification, Popconfirm, Table } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import Column from 'antd/lib/table/Column';
import React from 'react';
import { Query } from 'react-apollo';
import dayjs from 'dayjs';

import { RadioSelect } from '@/components/RadioSelect';

import { HerosItem, HerosState, Response } from './heros.interface';
import { GET_HEROS } from './query';

import styles from './hero.module.scss';

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

  render() {
    const { offset, limit, keyword, state, ...rest } = this.state;

    const expandedRowRender = (rocord: HerosItem) => (
      <>
        <div className={styles['form-list']}>
          <div>
            <span className={styles['form-label']}>ip: </span>
            <span>{rocord.ip}</span>
          </div>
          <div>
            <span className={styles['form-label']}>地址: </span>
            <span>
              {rocord.country} {rocord.city}
            </span>
          </div>
        </div>

        <div className={styles['form-list']}>
          <div>
            <span className={styles['form-label']}>浏览器: </span>
            <span>{rocord.ip}</span>
          </div>
          <div>
            <span className={styles['form-label']}>系统: </span>
            <span>
              {rocord.country} {rocord.city}
            </span>
          </div>
        </div>
        <div className={styles['form-list']}>
          <div>
            <span className={styles['form-label']}>内容: </span>
            <span>{rocord.content}</span>
          </div>
        </div>
      </>
    );

    return (
      <div>
        <RadioSelect typeList={[]} onSearch={this.search} />

        <div className="content">
          <Query<Response>
            query={GET_HEROS}
            variables={{ offset, limit, keyword, state }}
            notifyOnNetworkStatusChange
          >
            {({ data, loading, error, networkStatus, refetch }) => {
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
                    expandedRowRender={expandedRowRender}
                  >
                    <Column
                      key="name"
                      title="Name"
                      dataIndex="name"
                      width="400px"
                    />
                    <Column
                      key="create_at"
                      title="Create_at"
                      dataIndex="create_at"
                      render={text => dayjs(text).format('YYYY-MM-DD hh:mm:ss')}
                    />
                    <Column key="state" title="State" dataIndex="state" />

                    <Column
                      title="Action"
                      key="action"
                      width="300px"
                      render={(text, record: HerosItem) => {
                        return (
                          <>
                            <a href="javascript:;">edit</a>
                            <Divider type="vertical" />
                            {/* <DeleteLink
                              record={record}
                              refetch={refetch}
                              mutation={DELETE_LINK}
                              handleError={this.handleError}
                            /> */}
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
