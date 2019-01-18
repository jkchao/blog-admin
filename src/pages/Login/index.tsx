import { Form, Icon, Input, notification } from 'antd';
import ApolloClient from 'apollo-client';
import React from 'react';

import { LoginButton } from './Button';
import styles from './index.module.scss';
import {
  LoginState,
  Response,
  UserFormProps,
  Variables
} from './index.interface';
import { LOGIN } from './index.query';

class Login extends React.PureComponent<UserFormProps, LoginState> {
  state = {
    loading: false
  };

  handleSubmit = (e: React.MouseEvent, client: ApolloClient<any>) => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });

        try {
          const {
            data: { login }
          } = await client.query<Response, Variables>({
            query: LOGIN,
            variables: values,
            errorPolicy: 'all'
          });

          this.setState({
            loading: false
          });

          if (login) {
            window.localStorage.setItem('TOKEN', JSON.stringify(login));
            const path = this.props.location.state.from.pathname;
            this.props.history.push(path || '/dashboard');
          }
        } catch (error) {
          this.setState({
            loading: false
          });
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container}>
        <Form className={styles.form}>
          <Form.Item hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: '请输入姓名' },
                { min: 6, message: '最小长度为 6 位' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <LoginButton
              type="primary"
              htmlType="submit"
              className={styles['form-button']}
              login={this.handleSubmit}
              loading={this.state.loading}
            >
              Log in
            </LoginButton>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
