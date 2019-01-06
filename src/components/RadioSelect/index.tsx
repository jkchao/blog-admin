import React from 'react';
import { Radio } from 'antd';

import styles from './index.module.scss';
import { Search } from './Search';
interface Item {
  name: string;
  id: number | string;
}

export interface TypeList {
  name: string;
  typeName: string;
  list: Item[];
  defaultValue: string;
}

interface RadioSelectProps {
  hasSearch?: boolean;
  typeList: TypeList[];
}

export const RadioSelect = ({
  typeList,
  hasSearch = false
}: RadioSelectProps) => (
  <div className={styles['radio-list']}>
    {typeList.map(types => (
      <div className={styles['radio-item']}>
        <span>{types.name}：</span>
        <Radio.Group
          defaultValue={types.defaultValue}
          buttonStyle="solid"
          className={styles['ant-radio-group']}
        >
          {types.list.map(item => (
            <Radio.Button
              value={item.id}
              className={styles['ant-radio-button']}
            >
              {item.name}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
    ))}
    {hasSearch && <Search />}
  </div>
);
