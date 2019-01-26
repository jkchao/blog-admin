import React from 'react';
import styles from './index.module.scss';
import { Upload, Button } from 'antd';

interface Props {
  avatar: string;
  username: string;
  token: string;
}

export const AvatarView = ({ avatar, username, token }: Props) => (
  <>
    <div className={styles['avatar-title']}>{username}</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload action={process.env.REACT_APP_QINNIU_UPLOAD} data={token}>
      <div className={styles['button-view']}>
        <Button icon="upload">Change avatar</Button>
      </div>
    </Upload>
  </>
);
