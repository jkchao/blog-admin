import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { MutationFn } from 'react-apollo';

import { TagModelProps, MutationVariables } from './index.interface';
import { MutationComponent } from '@/components/Mutation';

const handleOk = (
  createTag: MutationFn<{}, MutationVariables>,
  { form: { validateFields }, title, handleCancel, _id }: TagModelProps
) => {
  validateFields(async (err, values: MutationVariables) => {
    if (!err) {
      await createTag({
        variables: title === 'Create' ? values : { ...values, _id }
      });
      handleCancel();
    }
  });
};

const btnCancel = ({ form: { resetFields }, handleCancel }: TagModelProps) => {
  resetFields();
  handleCancel();
};

const TagModelComponent = (props: TagModelProps) => {
  const {
    form: { getFieldDecorator },
    handleCancel,
    mutation,
    refetch,
    name,
    descript,
    ...modalProps
  } = props;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };

  return (
    <MutationComponent<{}, MutationVariables>
      mutation={mutation}
      ItemName={/^TagsItem/}
      refetch={refetch}
      shouldDeleteCache={props.title === 'Create'}
    >
      {(createTag, loading) => {
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
                onClick={() => handleOk(createTag, props)}
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
              <Form.Item label="descript" {...formItemLayout}>
                {getFieldDecorator('descript', {
                  initialValue: descript
                })(<Input placeholder="descript" />)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }}
    </MutationComponent>
  );
};

export const TagModal = Form.create()(TagModelComponent);
