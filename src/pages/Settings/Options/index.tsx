import { Button, Form, Input, Spin, message } from 'antd';
import React from 'react';

import {
  OptionsComponetProps,
  ResponseData,
  Options as OptionsInterface
} from './index.interface';
import styles from './index.module.scss';
import { Query, MutationFn } from 'react-apollo';
import { GET_OPTIONS } from './index.query';
import { MutationComponent } from '@/components/Mutation';
import { UPDATE_OPTIONS } from './index.mutation';

const { TextArea } = Input;

const submit = (
  mutation: MutationFn<{}, OptionsInterface>,
  { form: { validateFields }, _id }: OptionsComponetProps
) => {
  validateFields(async (err, values) => {
    if (!err) {
      await mutation({
        variables: { ...values, _id }
      });

      message.success('success');
    }
  });
};

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
                        required: true,
                        message: 'Please input your title!'
                      }
                    ]
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="副标题" {...formItemLayout}>
                  {getFieldDecorator('sub_title', {
                    initialValue: options.sub_title,
                    rules: [
                      {
                        required: true,
                        message: 'Please input sub_title!'
                      }
                    ]
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="关键词" {...formItemLayout}>
                  {getFieldDecorator('keyword', {
                    initialValue: options.keyword
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="站点地址" {...formItemLayout}>
                  {getFieldDecorator('url', {
                    initialValue: options.url,

                    rules: [
                      {
                        required: true,
                        message: 'Please input url!'
                      }
                    ]
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="电子邮件" {...formItemLayout}>
                  {getFieldDecorator('email', {
                    initialValue: options.email,

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
                    initialValue: options.icp
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="站点描述" {...formItemLayout}>
                  {getFieldDecorator('descript', {
                    initialValue: options.descript,
                    rules: [
                      {
                        required: true,
                        message: 'Please input descript!'
                      }
                    ]
                  })(<TextArea />)}
                </Form.Item>

                <Form.Item>
                  <MutationComponent<{}, OptionsInterface>
                    mutation={UPDATE_OPTIONS}
                    shouldDeleteCache={false}
                    ItemName={/^Options/}
                  >
                    {(mutation, loading) => {
                      return (
                        <Button
                          type="primary"
                          loading={loading}
                          onClick={() =>
                            submit(mutation, { ...props, _id: options._id })
                          }
                        >
                          Submit
                        </Button>
                      );
                    }}
                  </MutationComponent>
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
