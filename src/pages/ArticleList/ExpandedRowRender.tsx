import React from 'react';
import { ArticleItem } from './index.interface';
import styles from './index.module.scss';

export const ExandedRowRender = (record: ArticleItem) => (
  <>
    <div className={styles['form-list']}>
      <div>
        <span className={styles['form-label']}>标签: </span>
        <span>{record.tag}</span>
      </div>
    </div>

    <div className={styles['form-list']}>
      <div>
        <span className={styles['form-label']}>关键字: </span>
        <span>{record.keyword}</span>
      </div>
    </div>
    <div className={styles['form-list']}>
      <div>
        <span className={styles['form-label']}>描述: </span>
        <span>{record.descript}</span>
      </div>
    </div>
  </>
);
