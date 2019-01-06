import React from 'react';
import { Input } from 'antd';

export const Search = () => (
  <div className="radio-item">
    <span>搜索：</span>
    <Input.Search
      placeholder="input search text"
      onSearch={(value: string) => console.log(value)}
      style={{ width: 300, marginLeft: 14 }}
    />
  </div>
);
