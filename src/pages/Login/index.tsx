import React from 'react';
import styles from './index.module.scss';

import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RouterProps } from 'react-router';

interface UserFormProps extends FormComponentProps, RouterProps {
  username: string;
  password: string;
}

class Login extends React.Component<UserFormProps> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        window.localStorage.setItem(
          'TOKEN',
          JSON.stringify({ lifeTime: new Date().getTime() })
        );
        this.props.history.push('/');
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container}>
        <Form onSubmit={this.handleSubmit} className={styles.form}>
          <Form.Item hasFeedback>
            {getFieldDecorator('userName', {
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
            <Button
              type="primary"
              htmlType="submit"
              className={styles['form-button']}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
