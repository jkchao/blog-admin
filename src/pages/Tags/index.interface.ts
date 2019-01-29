import { FormComponentProps } from 'antd/lib/form';

export interface TagsItem {
  _id: string;
  name: string;
  descript: string;
  // sort: number;
  count: number;
}

export interface ResponseData {
  getTags: {
    limit: number;
    total: number;
    offset: number;
    docs: TagsItem[];
  };
}

export type MutationVariables = MakeKeyOptional<TagsItem, '_id' | 'count'>;

export interface QueryVariables {
  offset: number;
  limit: number;
  keyword: string;
}

export interface TagsState extends QueryVariables, MutationVariables {
  visible: boolean;
  title: 'Create' | 'Update';
  mutation: string;
}

export interface TagModelProps extends FormComponentProps, MutationVariables {
  visible: boolean;
  handleCancel: () => void;
  refetch: () => void;
  mutation: string;
  handleError: (message: string) => void;
  title: 'Create' | 'Update';
}
