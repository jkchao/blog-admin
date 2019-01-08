import React from 'react';
import { Input, Button } from 'antd';

interface SearchProp {
  onSearch: (value: string) => void;
  hasAddBtn?: boolean;
}

export const Search = ({ onSearch, hasAddBtn = false }: SearchProp) => (
  <div
    className="radio-item"
    style={{ display: 'flex', justifyContent: 'space-between' }}
  >
    <div>
      <span>搜索：</span>
      <Input.Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 300, marginLeft: 14 }}
      />
    </div>
    {hasAddBtn && <Button>添 加</Button>}
  </div>
);
