import React from 'react';
import { withRouter } from 'react-router';
import { Breadcrumb, Icon } from 'antd';
import styles from './index.module.scss';

export const BreadcrumbView = withRouter(props => {
  const { location } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);
  return (
    <Breadcrumb className={styles['ant-breadcrumb']}>
      <Breadcrumb.Item href="/dashboard">
        <span>首页</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item href="">
        <span>{pathSnippets}</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
});
