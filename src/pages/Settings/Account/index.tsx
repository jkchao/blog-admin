import React from 'react';
import { Form, Input, Button } from 'antd';
import { AccountComponetProps } from './index.interface';
const Item = Form.Item;

import styles from './index.module.scss';
import { Query } from 'react-apollo';
import { GET_INFO } from './index.query';

import { ResponseData, User } from '@/layouts/BaseLayout/index.interface';
import { AvatarView } from './AvatarView';

const submit = () => {
  // ..
};

const AccountComponent = ({
  form: { getFieldDecorator }
}: AccountComponetProps) => {
  return (
    <Query<ResponseData> query={GET_INFO}>
      {({ data }) => {
        const result = (data && data.getInfo) || ({} as Partial<User>);

        return (
          <div className={styles.view}>
            <div className={styles.left}>
              <Form onSubmit={submit}>
                <Item label="昵称">
                  {getFieldDecorator('name', {
                    initialValue: result.name,
                    rules: [
                      {
                        required: true,
                        message: 'Please input your name!'
                      }
                    ]
                  })(<Input />)}
                </Item>

                <Item label="个性签名">
                  {getFieldDecorator('slogan', {
                    initialValue: result.slogan
                  })(<Input />)}
                </Item>

                <Item label="原密码">
                  {getFieldDecorator('oldPassword', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input oldPassword'
                      }
                    ]
                  })(<Input placeholder="原密码" />)}
                </Item>

                <Item label="新密码">
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input new password'
                      }
                    ]
                  })(<Input placeholder="新密码" />)}
                </Item>

                <Item label="确认密码">
                  {getFieldDecorator('title', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!'
                      }
                    ]
                  })(<Input placeholder="确认密码" />)}
                </Item>

                <Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Item>
              </Form>
            </div>
            <div className={styles.right}>
              <AvatarView
                avatar={result.gravatar || ''}
                username={result.username || ''}
              />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export const Account = Form.create()(AccountComponent);
