import { Button, Form, Input, Spin } from 'antd';
import React from 'react';

import {
  OptionsComponetProps,
  ResponseData,
  Options as OptionsInterface
} from './index.interface';
import styles from './index.module.scss';
import { Query } from 'react-apollo';
import { GET_OPTIONS } from './index.query';

const { TextArea } = Input;

const OptionsComponent = (props: OptionsComponetProps) => {
  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };
  return (
    <div className={styles['view']}>
      <Query<ResponseData> query={GET_OPTIONS}>
        {({ data, loading }) => {
          const options: Partial<OptionsInterface> =
            (data && data.getOptions) || {};

          return (
            <Spin spinning={loading}>
              <Form>
                <Form.Item label="标题" {...formItemLayout}>
                  {getFieldDecorator('title', {
                    initialValue: options.title,
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

                <Form.Item label="副标题" {...formItemLayout}>
                  {getFieldDecorator('sub_title', {
                    initialValue: options.sub_title,
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

                <Form.Item label="关键词" {...formItemLayout}>
                  {getFieldDecorator('keyword', {
                    initialValue: options!.keyword
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="站点地址" {...formItemLayout}>
                  {getFieldDecorator('url', {
                    initialValue: options!.url,

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

                <Form.Item label="电子邮件" {...formItemLayout}>
                  {getFieldDecorator('email', {
                    initialValue: options!.email,

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

                <Form.Item label="ICP 备案号：" {...formItemLayout}>
                  {getFieldDecorator('icp', {
                    initialValue: options!.email
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="站点描述" {...formItemLayout}>
                  {getFieldDecorator('descript', {
                    initialValue: options!.descript,
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

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          );
        }}
      </Query>
    </div>
  );
};

export const Options = Form.create()(OptionsComponent);
