import { Omit } from 'react-router';
import { TagsItem } from '../Tags/index.interface';

export type State = 'ALL' | 'RELEASE' | 'DRAFT';
export type Publish = 'ALL' | 'PUBLISH' | 'PRIVATE';
export type ArticleType = 'CODE' | 'THINK' | 'FUCK';

export interface ArticleItem {
  _id: string;
  title: string;
  keyword: string;
  state: State;
  publish: Publish;
  thumb: string;
  type: ArticleType;
  tag: [TagsItem];
  descript: string;
  update_at: Date;
  create_at: Date;
}

export interface ResponseData {
  getArticles: {
    limit: number;
    total: number;
    offset: number;
    docs: ArticleItem[];
  };
}

export interface QueryVariables {
  offset: number;
  limit: number;
  keyword: string;
  state: State;
  publish: Publish;
  tag: string;
}

export interface ArticlesState extends QueryVariables {
  [index: string]: any;
}
