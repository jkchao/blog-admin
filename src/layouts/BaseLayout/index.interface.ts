import { RouteComponentProps } from 'react-router';

export interface User {
  _id: string;
  name: string;
  username: string;
  password: string;
  slogan: string;
  gravatar: string;
}

export interface ResponseData {
  getInfo: User;
}

export interface BaseLayoutProps extends RouteComponentProps {
  useInfo: {
    getInfo?: User;
  };
}

export interface BaseLayoutState {
  collapsed: boolean;
  currentUser?: User;
}
