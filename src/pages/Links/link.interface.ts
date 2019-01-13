export interface LinksItem {
  _id: string;
  name: string;
  url: string;
}

export interface Response {
  getLinks: {
    limit: number;
    total: number;
    offset: number;
    docs: LinksItem[];
  };
}

export interface LinksState extends Partial<LinksItem> {
  offset: number;
  limit: number;
  keyword: string;
  visible: boolean;
  title: 'Create' | 'Update';
  mutation: string;
}
