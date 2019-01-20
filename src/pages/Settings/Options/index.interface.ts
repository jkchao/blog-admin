import { FormComponentProps } from 'antd/lib/form';

export interface Options {
  _id: string;
  title: string;
  descript: string;
  email: string;
  icp: string;
  keyword: string;
  sub_title: string;
  url: string;
  meta: {
    like: string;
  };
}

export interface ResponseData {
  getOptions: Options;
}

export interface OptionsComponetProps
  extends FormComponentProps,
    Partial<Options> {}
