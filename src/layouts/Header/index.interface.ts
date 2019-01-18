import { User } from '../BaseLayout/index.interface';
import { ClickParam } from 'antd/lib/menu';

export interface HeaderProps {
  collapsed: boolean;
  currentUser?: User;
  toggle: () => void;
  onMenuClick: (param: ClickParam) => void;
}
