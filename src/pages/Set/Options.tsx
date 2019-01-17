import React from 'react';
import { Form, Input, Button } from 'antd';
import { OptionsComponetProps } from './set.interface';

const { TextArea } = Input;
import styles from './Options.module.scss';
class OptionsComponent extends React.Component<OptionsComponetProps> {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles['view']}>
        <Form>
          <Form.Item label="标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="副标题">
            {getFieldDecorator('sub_title', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="关键词">
            {getFieldDecorator('keyword')(<Input />)}
          </Form.Item>

          <Form.Item label="站点地址">
            {getFieldDecorator('url', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="站点描述">
            {getFieldDecorator('descript', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(<TextArea />)}
          </Form.Item>

          <Form.Item label="电子邮件">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="ICP备案号：">
            {getFieldDecorator('icp')(<Input />)}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export const Options = Form.create()(OptionsComponent);
