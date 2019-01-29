import { Omit } from 'react-router';

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

export interface CommentsState
  extends QueryVariables,
    Omit<Partial<CommentsItem>, 'state'> {
  [index: string]: any;
}
