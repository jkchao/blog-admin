import React from 'react';
import { Button } from 'antd';
// @ts-ignore
import './index.scss';
import { ButtonProps } from 'antd/lib/button';

// ant-design 没提供文字按钮，这在某些情况下使用
export const TextButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button className="button-text" type="primary" ghost {...rest}>
      {children}
    </Button>
  );
};
