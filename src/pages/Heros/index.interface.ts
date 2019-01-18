export interface HerosItem {
  _id: string;
  state: 'TODO' | 'SUCCESS' | 'FAIL';
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

export interface HerosState extends Partial<HerosItem> {
  offset: number;
  limit: number;
  keyword: string;
  [index: string]: any;
}
