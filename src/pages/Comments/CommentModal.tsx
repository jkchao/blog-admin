import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { MutationFn } from 'react-apollo';

import { CommentsModalProps, ModalMutationsVariables } from './index.interface';
import { MutationComponent } from '@/components/Mutation';

const handleOk = (
  mutationComments: MutationFn<{}, ModalMutationsVariables>,
  { form: { validateFields }, handleCancel, _id, author }: CommentsModalProps
) => {
  validateFields(async (err, values) => {
    if (!err) {
      await mutationComments({
        variables: {
          _id,
          content: values.content,
          author: {
            email: author.email,
            site: author.site,
            // ...author,
            name: values.name
          }
        }
      });
      handleCancel();
    }
  });
};

const btnCancel = ({
  form: { resetFields },
  handleCancel
}: CommentsModalProps) => {
  resetFields();
  handleCancel();
};

const CommentModelComponent = (props: CommentsModalProps) => {
  const {
    form: { getFieldDecorator },
    handleCancel,
    mutation,
    content,
    author,
    ...modalProps
  } = props;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };

  return (
    <MutationComponent<{}, ModalMutationsVariables>
      mutation={mutation}
      ItemName={/^CommentsItem/}
      shouldDeleteCache={false}
    >
      {(mutationComments, loading) => {
        return (
          <Modal
            {...modalProps}
            maskClosable={false}
            onCancel={() => btnCancel(props)}
            title="Edit"
            footer={[
              <Button key="close" onClick={() => btnCancel(props)}>
                close
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={() => handleOk(mutationComments, props)}
              >
                Submit
              </Button>
            ]}
          >
            <Form>
              <Form.Item label="name" {...formItemLayout}>
                {getFieldDecorator('name', {
                  initialValue: author.name,
                  rules: [{ required: true, message: 'name is required' }]
                })(<Input placeholder="name" />)}
              </Form.Item>
              <Form.Item label="content" {...formItemLayout}>
                {getFieldDecorator('content', {
                  initialValue: content,
                  rules: [{ required: true, message: 'url is required' }]
                })(<Input placeholder="content" />)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }}
    </MutationComponent>
  );
};

export const ComponentsModal = Form.create()(CommentModelComponent);
