import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { MutationFn } from 'react-apollo';

import { LinkModelProps, MutationVariables } from './index.interface';
import { MutationComponent } from '@/components/Mutation';

const handleOk = (
  mutationLink: MutationFn<{}, MutationVariables>,
  { form: { validateFields }, title, handleCancel, _id }: LinkModelProps
) => {
  validateFields(async (err, values: MutationVariables) => {
    if (!err) {
      await mutationLink({
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
    ...modalProps
  } = props;

  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 }
  };

  return (
    <MutationComponent<{}, MutationVariables>
      mutation={mutation}
      ItemName={/^LinksItem/}
      refetch={refetch}
      shouldDeleteCache={props.title === 'Create'}
    >
      {(createLink, loading) => {
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
    </MutationComponent>
  );
};

export const LinkModal = Form.create()(LinkModelComponent);
