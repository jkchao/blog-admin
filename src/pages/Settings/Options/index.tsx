import { Button, Form, Input, Spin, notification } from 'antd';
import React from 'react';

import { OptionsComponetProps, ResponseData } from './index.interface';
import styles from './index.module.scss';
import { Query } from 'react-apollo';
import { GET_OPTIONS } from './index.query';

const { TextArea } = Input;

const OptionsComponent = (props: OptionsComponetProps) => {
  const { getFieldDecorator } = props.form;
  return (
    <div className={styles['view']}>
      <Query<ResponseData> query={GET_OPTIONS} errorPolicy="all">
        {({ data, loading, error }) => {
          if (error) {
            notification.error({
              message: 'GraphQL error',
              description: error.message,
              duration: 5
            });
          }

          const options = data!.getOptions || {};

          return (
            <Spin spinning={loading}>
              <Form>
                <Form.Item label="标题">
                  {getFieldDecorator('title', {
                    initialValue: options!.title,
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
                    initialValue: options!.sub_title,
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
                  {getFieldDecorator('keyword', {
                    initialValue: options!.keyword
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="站点地址">
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

                <Form.Item label="电子邮件">
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

                <Form.Item label="ICP 备案号：">
                  {getFieldDecorator('icp', {
                    initialValue: options!.email
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="站点描述">
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
