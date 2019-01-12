import React, { PureComponent } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { LinksItem } from '.';
import { Omit } from 'antd/lib/_util/type';
import { Mutation, MutationFn } from 'react-apollo';
import { deleteCache } from '@/utils';

interface LinkModelProps extends FormComponentProps {
  visible: boolean;
  handleCancel: () => void;
  refetch: () => void;
  mutation: string;
  handleError: (message: string) => void;
}

class LinkModel extends PureComponent<LinkModelProps> {
  handleOk = (createLink: MutationFn): void => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await createLink({
          variables: values
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
          deleteCache(cache, /^LinksItem/);
          refetch();
        }}
      >
        {(createLink, { loading, error }) => {
          error && this.props.handleError(error.message);
          return (
            <Modal
              {...modalProps}
              title="添加链接"
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
                <Form.Item label="姓名" {...formItemLayout}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'name is required' }]
                  })(<Input placeholder="name" />)}
                </Form.Item>
                <Form.Item label="url" {...formItemLayout}>
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: 'url is required' }]
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

export const CreateLink = Form.create()(LinkModel);
