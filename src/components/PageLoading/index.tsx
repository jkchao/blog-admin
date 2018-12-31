import React from 'react';
import { Spin } from 'antd';

export const PageLoading = () => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin size="large" />
  </div>
);
