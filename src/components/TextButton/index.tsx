import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';
import { ButtonProps } from 'antd/lib/button';

// ant-design 没提供文字按钮，这在某些情况下使用
export const TextButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <Button
      type="primary"
      ghost
      className={`${className || ''} ${styles['button-text']}`}
      {...rest}
    >
      {children}
    </Button>
  );
};
