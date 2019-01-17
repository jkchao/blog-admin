import { FormComponentProps } from 'antd/lib/form';

export interface OptionsProps {
  title: string;
}

export interface OptionsComponetProps
  extends FormComponentProps,
    Partial<OptionsProps> {}
