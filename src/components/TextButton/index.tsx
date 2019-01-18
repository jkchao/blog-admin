import React from 'react';
import { Button } from 'antd';
import { TextButtonProps } from './index.interface';

// ant-design 没提供文字按钮，这在某些情况下使用
export const TextButton = ({ children, ...btnProps }: TextButtonProps) => {
  return <Button {...btnProps}>{children}</Button>;
};
