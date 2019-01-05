import React from 'react';
import { Radio } from 'antd';

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
  children: React.ReactNode;
}

export const RadioSelect = ({ typeList, children }: RadioSelectProps) => (
  <div>
    {typeList.map(types => (
      <>
        <span>{types.name}</span>
        <Radio.Group defaultValue={types.defaultValue}>
          {types.list.map(item => (
            <Radio.Button value={item.id}>{item.name}</Radio.Button>
          ))}
        </Radio.Group>
      </>
    ))}
    {children}
  </div>
);
