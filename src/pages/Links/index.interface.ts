import { FormComponentProps } from 'antd/lib/form';

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

export type MutationVariables = MakeKeyOptional<LinksItem, '_id'>;

export interface QueryVariables {
  offset: number;
  limit: number;
  keyword: string;
}

export interface LinksState extends QueryVariables, MutationVariables {
  visible: boolean;
  title: 'Create' | 'Update';
  mutation: string;
}

export interface LinkModelProps extends FormComponentProps, MutationVariables {
  visible: boolean;
  handleCancel: () => void;
  refetch: () => void;
  mutation: string;
  title: 'Create' | 'Update';
}
