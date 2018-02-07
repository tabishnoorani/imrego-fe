import React from 'react';
import {
  Card,
  Radio, 
  Form, 
  Input,  
  Checkbox, 
  Button } from 'antd';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group;

class Privacy extends React.Component {
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
        <Card title="Privacy" bordered={false} style={{ width: '100%' }}>
        <Form>
          <FormItem
            label={<b>Display Name</b>}
          >
            {getFieldDecorator('displayname', {
              rules: [{ required: false, message: 'Please input your contact number!' }],
            })(
              <Input style={{ width: '100%' }} />
            )}
          </FormItem>

          <FormItem
            label={<b>Visible contact details to public</b>}
          >
            {getFieldDecorator('visibleContact', {
                initialValue:['Email']
            })(
              <CheckboxGroup options={['Email', 'Contact Number', 'Address']} />
            )}
          </FormItem>

          <FormItem
            label={<b>Do make visible very item in the search?</b>}
          >
            {getFieldDecorator('itemvisible', {
                initialValue:'false'
            })(
            <RadioGroup>
              <RadioButton value="true">Yes</RadioButton>
              <RadioButton value="false">No</RadioButton>
            </RadioGroup>
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

const  PrivacyCF = Form.create()(Privacy);
export default PrivacyCF;