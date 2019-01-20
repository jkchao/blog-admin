import { Omit } from 'react-router';

type State = 'TODO' | 'SUCCESS' | 'FAIL';

export interface HerosItem {
  _id: string;
  state: State;
  name: string;
  content: string;
  ip: string;
  agent: string;
  city: string;
  country: string;
  range: string;
  create_at: Date;
}

export interface ResponseData {
  getHeros: {
    limit: number;
    total: number;
    offset: number;
    docs: HerosItem[];
  };
}

export interface QueryVariables {
  offset: number;
  limit: number;
  keyword: string;
  state: State;
}

export interface HerosState
  extends QueryVariables,
    Omit<Partial<HerosItem>, 'state'> {
  [index: string]: any;
}
