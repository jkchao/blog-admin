import { FormComponentProps } from 'antd/lib/form';
import { User } from '@/layouts/BaseLayout/index.interface';

export interface AccountComponetProps extends FormComponentProps {}

export interface AccountComponetState {
  confirmDirty: boolean;
  gravatar: string;
}

export interface Variables extends User {
  oldPassword: string;
}

export interface QinNiuVariables {
  getQiniu: {
    token: string;
  };
}
