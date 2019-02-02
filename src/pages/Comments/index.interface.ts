import { Omit } from 'react-router';
import { FormComponentProps } from 'antd/lib/form';

type State = 'TODO' | 'SUCCESS' | 'FAIL';

export interface CommentsItem {
  _id: string;
  post_id: number;
  pid: number;
  content: string;
  author: Author;
  ip: string;
  agent: string;
  city: string;
  range: number[];
  country: string;
  likes: number;
  state: State;
}

interface Author {
  name: string;
  email: string;
  site: string;
}

export interface ResponseData {
  getComments: {
    limit: number;
    total: number;
    offset: number;
    docs: CommentsItem[];
  };
}

export interface QueryVariables {
  offset: number;
  limit: number;
  keyword: string;
  state: State;
}

export interface ChangeStateMutationVariables
  extends Pick<CommentsItem, '_id' | 'state'> {}

export interface ModalMutationsVariables
  extends Pick<CommentsItem, 'content' | '_id' | 'author'> {}

export interface CommentsState
  extends QueryVariables,
    Omit<Partial<CommentsItem>, 'state'> {
  visible: boolean;
  content: string;
  [index: string]: any;
}

export interface CommentsModalProps
  extends FormComponentProps,
    ModalMutationsVariables {
  visible: boolean;
  handleCancel: () => void;
  mutation: string;
}
