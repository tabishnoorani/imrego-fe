import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Modal } from 'antd';
const FormItem = Form.Item;

class RegistrationForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { visible, onCancel, onCreate, createUserLoder, DesSignupModal } = this.props;
    
    return (
      <Modal 
      visible={visible}
      title="Signup for a new account"
      okText="Create"
      confirmLoading = {createUserLoder}
      onCancel= {onCancel}
      onOk = {onCreate}
      destroyOnClose={DesSignupModal}>
      <Form>
        <FormItem
          {...formItemLayout}
          label="First Name"
        >
          {getFieldDecorator('fname', {
            rules: [{ required: true, message: 'Please input your First Name.', whitespace: true }],
          })(
            <Input disabled= {createUserLoder}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Last Name"
        >
          {getFieldDecorator('lname', {
            rules: [{ required: true, message: 'Please input your Last Name.', whitespace: true }],
          })(
            <Input disabled= {createUserLoder}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input disabled= {createUserLoder}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Password&nbsp;
              <Tooltip title={`- at least 8 characters
              - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
              - Can contain special characters`}>
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g , message: 'The input is not valid Password!'}
            ],
          })(
            <Input type="password" disabled= {createUserLoder}/>
          )}
        </FormItem>
      </Form>
      </Modal>
    );
  }
}

const CollectionCreateForm = Form.create()(RegistrationForm);

export default CollectionCreateForm;