import { Button, Form, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import React, { PureComponent } from 'react';
import { Mutation, MutationFn } from 'react-apollo';

import { deleteCache } from '@/utils';

import { LinksItem } from './link.interface';

interface LinkModelProps extends FormComponentProps, Partial<LinksItem> {
  visible: boolean;
  handleCancel: () => void;
  refetch: () => void;
  mutation: string;
  handleError: (message: string) => void;
  title: 'Create' | 'Update';
}

class LinkModelComponent extends PureComponent<LinkModelProps> {
  handleOk = (createLink: MutationFn): void => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await createLink({
          variables:
            this.props.title === 'Create'
              ? values
              : { ...values, _id: this.props._id }
        });
        this.props.handleCancel();
      }
    });
  };
  handleCancel = () => {
    this.props.form.resetFields();
    this.props.handleCancel();
  };

  render() {
    const {
      form: { getFieldDecorator },
      handleCancel,
      mutation,
      refetch,
      name,
      url,
      ...modalProps
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 }
    };
    return (
      <Mutation
        mutation={mutation}
        update={cache => {
          if (this.props.title === 'Create') {
            deleteCache(cache, /^LinksItem/);
            refetch();
          } else {
            // ..
          }
        }}
      >
        {(createLink, { loading, error }) => {
          error && this.props.handleError(error.message);
          return (
            <Modal
              {...modalProps}
              maskClosable={false}
              onCancel={this.handleCancel}
              footer={[
                <Button key="close" onClick={this.handleCancel}>
                  close
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={() => this.handleOk(createLink)}
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
                        message: 'url 不正确'
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
  }
}

export const LinkModel = Form.create()(LinkModelComponent);
