import React from 'react';
import { HerosItem } from './index.interface';
import styles from './index.module.scss';

export const ExandedRowRender = (record: HerosItem) => (
  <>
    <div className={styles['form-list']}>
      <div>
        <span className={styles['form-label']}>ip: </span>
        <span>{record.ip}</span>
      </div>
      <div>
        <span className={styles['form-label']}>地址: </span>
        <span>
          {record.country} {record.city}
        </span>
      </div>
    </div>

    <div className={styles['form-list']}>
      <div>
        <span className={styles['form-label']}>浏览器: </span>
        <span>{record.ip}</span>
      </div>
      <div>
        <span className={styles['form-label']}>系统: </span>
        <span>
          {record.country} {record.city}
        </span>
      </div>
    </div>
    <div className={styles['form-list']}>
      <div>
        <span className={styles['form-label']}>内容: </span>
        <span>{record.content}</span>
      </div>
    </div>
  </>
);
