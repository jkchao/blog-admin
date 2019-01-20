import { FormComponentProps } from 'antd/lib/form';
import { Omit } from 'react-router';

export interface LinksItem {
  _id: string;
  name: string;
  url: string;
}

export interface ResponseData {
  getLinks: {
    limit: number;
    total: number;
    offset: number;
    docs: LinksItem[];
  };
}

export interface QueryVariables {
  offset: number;
  limit: number;
  keyword: string;
}

export interface LinksState
  extends QueryVariables,
    MakeKeyOptional<LinksItem, '_id'> {
  visible: boolean;
  title: 'Create' | 'Update';
  mutation: string;
}

export interface LinkModelProps
  extends FormComponentProps,
    MakeKeyOptional<LinksItem, '_id'> {
  visible: boolean;
  handleCancel: () => void;
  refetch: () => void;
  mutation: string;
  handleError: (message: string) => void;
  title: 'Create' | 'Update';
}
