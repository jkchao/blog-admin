import { RouteComponentProps } from 'react-router';
import { FormComponentProps } from 'antd/lib/form';

export interface SetState {
  selectKey: string;
  menu: {
    [index: string]: string;
  };
}

export interface SetProps extends RouteComponentProps {}

export interface OptionsProps {
  title: string;
}

export interface OptionsComponetProps
  extends FormComponentProps,
    Partial<OptionsProps> {}
