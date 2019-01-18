import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { Mutation, MutationFn } from 'react-apollo';

import { deleteCache } from '@/utils';

import { LinkModelProps } from './index.interface';

const handleOk = (
  createLink: MutationFn,
  { form: { validateFields }, title, handleCancel, _id }: LinkModelProps
) => {
  validateFields(async (err, values) => {
    if (!err) {
      await createLink({
        variables: title === 'Create' ? values : { ...values, _id }
      });
      handleCancel();
    }
  });
};

const btnCancel = ({ form: { resetFields }, handleCancel }: LinkModelProps) => {
  resetFields();
  handleCancel();
};

const LinkModelComponent = (props: LinkModelProps) => {
  const {
    form: { getFieldDecorator },
    handleCancel,
    mutation,
    refetch,
    name,
    url,
    handleError,
    ...modalProps
  } = props;

  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 }
  };

  return (
    <Mutation
      mutation={mutation}
      update={cache => {
        if (props.title === 'Create') {
          // 创建的时候，需要删除对应键的缓存
          // 然后重新请求
          deleteCache(cache, /^LinksItem/);
          refetch();
        }
      }}
    >
      {(createLink, { loading, error }) => {
        error && handleError(error.message);
        return (
          <Modal
            {...modalProps}
            maskClosable={false}
            onCancel={() => btnCancel(props)}
            footer={[
              <Button key="close" onClick={() => btnCancel(props)}>
                close
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={() => handleOk(createLink, props)}
              >
                Submit
              </Button>
            ]}
          >
            <Form>
              <Form.Item label="name" {...formItemLayout}>
                {getFieldDecorator('name', {
                  initialValue: name,
                  rules: [{ required: true, message: 'name is required' }]
                })(<Input placeholder="name" />)}
              </Form.Item>
              <Form.Item label="url" {...formItemLayout}>
                {getFieldDecorator('url', {
                  initialValue: url,
                  rules: [
                    { required: true, message: 'url is required' },
                    {
                      pattern: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
                      message: 'url 格式不正确'
                    }
                  ]
                })(<Input placeholder="url" />)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }}
    </Mutation>
  );
};

export const LinkModal = Form.create()(LinkModelComponent);
