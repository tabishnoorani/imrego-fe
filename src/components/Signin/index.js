import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, notification } from 'antd';
import { signin, resetSigninNotification } from '../../store/actions/index';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends Component {
  
  componentDidMount() {
    this.props.form.validateFields();
  }
  
  aNotification(message=this.props.signinField) {
    if (this.props.signinField!==""){
      notification.open({
        message: 'Invalid User',
        description: message,
        duration: 0,
      });
      resetSigninNotification(this.props.dispatch);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, credentials) => {
      if (!err) {
        const { dispatch } = this.props

        signin(dispatch, credentials, this.aNotification.bind(this));
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="inline" 
      onSubmit={this.handleSubmit} 
      >
        <FormItem
          validateStatus={emailError ? 'error' : ''}
          help={emailError || ''}
          hasFeedback = {true}
        >
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'The input is not valid E-mail!'}
                  ],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
          hasFeedback = {true}
        >
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g , message: 'The input is not valid Password!'}
            ],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem  style={{marginRight:'16px'}}>
          <Button
            type="primary"
            loading = {this.props.Status.loders.signin}
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            SIGN IN
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);

const returnState = (store)=>{
  return({
    Status: store.Status, 
    signinField: store.Status.msg.signinField 
  });
}
export default connect(returnState)(WrappedHorizontalLoginForm);
