import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signin } from '../../store/actions/index';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props
        signin(dispatch, values);
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="inline" 
      onSubmit={this.handleSubmit} 
      >
        <FormItem
          validateStatus={emailError ? 'error' : ''}
          help={emailError || ''}
        >
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem  style={{marginRight:'16px'}}>
          <Button
            // type="primary"
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
    Status: store.Status 
  });
}
export default connect(returnState)(WrappedHorizontalLoginForm);
