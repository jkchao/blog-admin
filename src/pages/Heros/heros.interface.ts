export interface HerosItem {
  _id: string;
  name: string;
  content: string;
  ip: string;
  agent: string;
  city: string;
  country: string;
  range: string;
  create_at: Date;
}

export interface Response {
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
  state: 'TODO' | 'SUCCESS' | 'FAIL';
}
