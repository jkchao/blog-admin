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

export interface LinksState extends Partial<LinksItem> {
  offset: number;
  limit: number;
  keyword: string;
  visible: boolean;
  title: 'Create' | 'Update';
  mutation: string;
}

export interface LinkModelProps extends FormComponentProps, Partial<LinksItem> {
  visible: boolean;
  handleCancel: () => void;
  refetch: () => void;
  mutation: string;
  handleError: (message: string) => void;
  title: 'Create' | 'Update';
}
