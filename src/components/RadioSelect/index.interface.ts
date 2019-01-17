import { RadioChangeEvent } from 'antd/lib/radio';

export interface Item {
  name: string;
  id: number | string;
}

export interface TypeList {
  name: string;
  typeName: string;
  list: Item[];
  defaultValue: string;
}

export interface RadioSelectProps {
  typeList: TypeList[];
  onSearch: (value: string) => void;
  handleClick?: () => void;
  onChange?: (e: RadioChangeEvent, typeName: string) => void;
}
