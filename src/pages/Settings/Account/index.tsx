import React, { Fragment } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { AccountComponetProps } from './index.interface';
const Item = Form.Item;

import styles from './index.module.scss';

const AvatarView = ({ avatar }: { avatar: string }) => (
  <Fragment>
    <div className={styles['avatar-title']}>三毛</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload fileList={[]}>
      <div className={styles['button-view']}>
        <Button icon="upload">Change avatar</Button>
      </div>
    </Upload>
  </Fragment>
);

const AccountComponent = ({
  form: { getFieldDecorator }
}: AccountComponetProps) => {
  return (
    <div className={styles.view}>
      <div className={styles.left}>
        <Form>
          <Item label="昵称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please input your name!'
                }
              ]
            })(<Input />)}
          </Item>

          <Item label="个性签名">{getFieldDecorator('slogan')(<Input />)}</Item>

          <Item label="原密码">
            {getFieldDecorator('oldPassword', {
              rules: [
                {
                  required: true,
                  message: 'Please input oldPassword'
                }
              ]
            })(<Input />)}
          </Item>

          <Item label="新密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input new password'
                }
              ]
            })(<Input />)}
          </Item>

          <Item label="确认密码">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]
            })(<Input />)}
          </Item>

          <Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Item>
        </Form>
      </div>
      <div className={styles.right}>
        <AvatarView avatar="https://avatars3.githubusercontent.com/u/22933931?s=460&v=4" />
      </div>
    </div>
  );
};

export const Account = Form.create()(AccountComponent);
