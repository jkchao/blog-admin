import React from 'react';
import { Form, Input, Button, message } from 'antd';
import {
  AccountComponetProps,
  Variables,
  QinNiuVariables
} from './index.interface';
const Item = Form.Item;

import styles from './index.module.scss';
import { Query, MutationFn } from 'react-apollo';
import { GET_INFO, GET_QINIU } from './index.query';

import { ResponseData, User } from '@/layouts/BaseLayout/index.interface';
import { AvatarView } from './AvatarView';
import { MutationComponent } from '@/components/Mutation';
import { UPDATE_INFO } from './index.mutations';

class AccountComponent extends React.Component<
  AccountComponetProps,
  { confirmDirty: boolean }
> {
  private gravatar = '';

  state = {
    confirmDirty: false
  };

  handleSubmit = (
    e: React.FormEvent<any>,
    mutation: MutationFn<{}, Variables>,
    _id = ''
  ) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        await mutation({
          variables: {
            ...values,
            _id,
            gravatar: this.gravatar
          }
        });
        message.success('success');
        this.props.form.resetFields(['oldPassword', 'password', 'confirm']);
      }
    });
  };

  handleConfirmBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateToNextPassword = (
    rule: object,
    value: string,
    callback: () => void
  ) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  onChangeAvatar = (avatar: string) => {
    this.gravatar = avatar;
  };

  compareToFirstPassword = (
    rule: object,
    value: string,
    callback: (para?: string) => void
  ) => {
    const form = this.props.form;
    const oldPassword = form.getFieldValue('password');
    if (oldPassword && value !== oldPassword) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  render() {
    const { form } = this.props;
    const getFieldDecorator = form.getFieldDecorator;
    return (
      <Query<ResponseData> query={GET_INFO}>
        {({ data }) => {
          const result = (data && data.getInfo) || ({} as Partial<User>);

          return (
            <div className={styles.view}>
              <div className={styles.left}>
                <Form>
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
                    })(<Input type="password" placeholder="原密码" />)}
                  </Item>

                  <Item label="新密码">
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          validator: this.validateToNextPassword
                        }
                      ]
                    })(<Input placeholder="新密码" type="password" />)}
                  </Item>

                  <Item label="确认密码">
                    {getFieldDecorator('confirm', {
                      rules: [
                        {
                          validator: this.compareToFirstPassword
                        }
                      ]
                    })(
                      <Input
                        placeholder="确认密码"
                        type="password"
                        onBlur={this.handleConfirmBlur}
                      />
                    )}
                  </Item>

                  <Item>
                    <MutationComponent
                      mutation={UPDATE_INFO}
                      ItemName={/UserInfo/}
                      shouldDeleteCache={false}
                    >
                      {(mutation, loading) => (
                        <Button
                          type="primary"
                          loading={loading}
                          onClick={(e: React.FormEvent<any>) =>
                            this.handleSubmit(e, mutation, result._id)
                          }
                        >
                          Submit
                        </Button>
                      )}
                    </MutationComponent>
                  </Item>
                </Form>
              </div>
              <div className={styles.right}>
                <Query<QinNiuVariables> query={GET_QINIU}>
                  {({ data }) => {
                    const res = (data && data.getQiniu) || { token: '' };
                    return (
                      <AvatarView
                        avatar={result.gravatar || ''}
                        username={result.username || ''}
                        token={res.token}
                        onChangeAvatar={this.onChangeAvatar}
                      />
                    );
                  }}
                </Query>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export const Account = Form.create()(AccountComponent);
