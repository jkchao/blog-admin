import { RouteComponentProps } from 'react-router';

export interface SetState {
  selectKey: string;
  menu: {
    [index: string]: string;
  };
}

export interface SetProps extends RouteComponentProps {}
