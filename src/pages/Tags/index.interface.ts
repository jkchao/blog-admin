import { FormComponentProps } from 'antd/lib/form';
import { Omit } from 'react-router';

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

export interface TagsState
  extends Omit<QueryVariables, 'offset' | 'limit'>,
    MutationVariables {
  visible: boolean;
  title: 'Create' | 'Update';
  mutation: string;
}

export interface TagModelProps extends FormComponentProps, MutationVariables {
  visible: boolean;
  handleCancel: () => void;
  refetch: () => void;
  mutation: string;
  title: 'Create' | 'Update';
}
