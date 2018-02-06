import React from 'react';
import {
  Card,
  Row,
  Col, 
  Upload, 
  Divider, 
  Radio, 
  Form, 
  Input, 
  Tooltip, 
  Icon, 
  Cascader, 
  Select, 
  Checkbox, 
  Button, 
  AutoComplete } from 'antd';

import config from '../../../config';
const FormItem = Form.Item;
const Option = Select.Option;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group

const CheckboxGroup = Checkbox.Group;



class Profile extends React.Component {
  state = {
    fileList: [],
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    
    const imgProps = {
      action: `${config.HOST_URL}/api/imgupload`,
      onRemove: (file) => {
        this.setState({
          fileList: [],
        });
      },
      beforeUpload: (file) => {
        this.setState({fileList:[file]})
        return false;
      },
      fileList: this.state.fileList,
    };

    const formItemLayout = {
      // labelCol: {
      //   xs: { span: 24 },
      //   sm: { span: 8 },
      // },
      // wrapperCol: {
      //   xs: { span: 24 },
      //   sm: { span: 16 },
      // },
    };

    const tailFormItemLayout = {
      // wrapperCol: {
      //   xs: {
      //     span: 24,
      //     offset: 0,
      //   },
      //   sm: {
      //     span: 16,
      //     offset: 8,
      //   },
      // },
    };

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '61',
    })(
      <Select style={{ width: 70 }}>
        <Option value="61">+61</Option>
      </Select>
    );

    return (
      <Row type="flex" justify="start" gutter={16} style={{width:'100%'}}>
        <Col span={12}>
          <Card title="Profile" bordered={false} style={{ width: '100%' }}>
            <Row>
              <Col span={8} style={{padding:'0px 10px'}}>
                <img src='/profile.png' style={{width:'100%'}}/>
              </Col>

              <Col span={16}>
                <p><b>First Name:</b> Tabbish</p>
                <p><b>Last Name:</b> Noorani</p>
                <p><b>Email:</b> tabish.noornai@gmail.com</p>
              </Col>
            </Row>
          
            <Form onSubmit={this.handleSubmit} style={{width:'100%'}}>
              <FormItem
                {...formItemLayout}
                label={<b>Gender</b>}
              >
                {getFieldDecorator('gender', {})(
                <RadioGroup defaultValue="undisclosed">
                  <RadioButton value="female">Female</RadioButton>
                  <RadioButton value="male">Male</RadioButton>
                  <RadioButton value="other">Other</RadioButton>
                  <RadioButton value="undisclosed">Undisclosed</RadioButton>
                </RadioGroup>
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label={<b>Address</b>}
              >
                {getFieldDecorator('confirm', {})(
                  <Input type="text" onBlur={this.handleConfirmBlur} />
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label={<b>Contact Number</b>}
              >
                {getFieldDecorator('phone', {
                  rules: [{ required: false, message: 'Please input your contact number!' }],
                })(
                  <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
              </FormItem>

              <FormItem
              {...formItemLayout}
              label={<b>Profile Picture</b>}
              >
              {getFieldDecorator('imgs')(
                <Upload {...imgProps}>
                    <Button>
                    <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>)}
              </FormItem>

              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Update</Button>
              </FormItem>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Privacy" bordered={false} style={{ width: '100%' }}>
            <Form>
              <FormItem
                {...formItemLayout}
                label={<b>Display Name</b>}
              >
                {getFieldDecorator('displayname', {
                  rules: [{ required: false, message: 'Please input your contact number!' }],
                })(
                  <Input style={{ width: '100%' }} />
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label={<b>Visible contact details to public</b>}
              >
                {getFieldDecorator('visibleContact', {})(
                  <CheckboxGroup options={['Email', 'Contact Number', 'Address']} />
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label={<b>Do make visible very item in the search?</b>}
              >
                {getFieldDecorator('itemvisible', {})(
                <RadioGroup defaultValue="false">
                  <RadioButton value="true">Yes</RadioButton>
                  <RadioButton value="false">No</RadioButton>
                </RadioGroup>
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Update</Button>
              </FormItem>
            </Form>
          </Card>
          <Card title="Security" bordered={false} style={{ width: '100%', marginTop:'20px' }}>
            <Form>
              <FormItem
              {...formItemLayout}
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
              {...formItemLayout}
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
              {...formItemLayout}
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

              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Update</Button>
              </FormItem>
              
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

const  ProfileCF = Form.create()(Profile);
export default ProfileCF;