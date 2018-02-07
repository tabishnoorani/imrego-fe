import React from 'react';
import {
  Card,
  Form, 
  Input, 
  Tooltip, 
  Icon, 
  Button } from 'antd';

const FormItem = Form.Item;

class Security extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card title="Security" bordered={false} style={{ width: '100%', marginTop:'20px' }}>
        <Form>
          <FormItem
          label={(
            <span>
            Current Password&nbsp;
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
            <Input type="password" disabled= {false}/>
          )}
          </FormItem>

          <FormItem
          label={(
            <span>
            New Password&nbsp;
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
            <Input type="password" disabled= {false}/>
          )}
          </FormItem>
          <FormItem
          label={(
            <span>
            Confirm Password&nbsp;
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
            <Input type="password" disabled= {false}/>
          )}
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit">Update</Button>
          </FormItem>

        </Form>
      </Card>
    );
  }
}

const  SecuirtyCF = Form.create()(Security);
export default SecuirtyCF;