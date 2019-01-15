import React from 'react';
import { Radio } from 'antd';

import styles from './index.module.scss';
import { Search } from './Search';
import { RadioChangeEvent } from 'antd/lib/radio';
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
  typeList: TypeList[];
  onSearch: (value: string) => void;
  handleClick?: () => void;
  onChange?: (e: RadioChangeEvent, typeName: string) => void;
}

export const RadioSelect = ({
  typeList,
  onChange,
  ...props
}: RadioSelectProps) => (
  <div className={styles['radio-list']}>
    {onChange &&
      typeList.map(types => (
        <div className={styles['radio-item']} key={types.name}>
          <span>{types.name}：</span>
          <Radio.Group
            defaultValue={types.defaultValue}
            buttonStyle="solid"
            className={styles['ant-radio-group']}
            onChange={(e: RadioChangeEvent) => onChange(e, types.typeName)}
          >
            {types.list.map(item => (
              <Radio.Button
                value={item.id}
                key={item.id}
                className={styles['ant-radio-button']}
              >
                {item.name}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
      ))}
    {props.onSearch && <Search {...props} />}
  </div>
);
