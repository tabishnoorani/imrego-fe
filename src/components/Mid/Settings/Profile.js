import React from 'react';
import {
  Card,
  Row,
  Col, 
  Upload, 
  Radio, 
  Form, 
  Input,  
  Icon,  
  Select, 
  Button } from 'antd';

import config from '../../../config';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group

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

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '61',
    })(
      <Select style={{ width: 70 }}>
        <Option value="61">+61</Option>
      </Select>
    );

    return (
      <Card title="Profile" bordered={false} style={{ height: '100%', width: '100%' }}>
        <Row>
          <Col span={8} style={{padding:'0px 10px'}}>
            <img alt='' src='/profile.png' style={{width:'100%'}}/>
          </Col>

          <Col span={16}>
            <p><b>First Name:</b> Tabbish</p>
            <p><b>Last Name:</b> Noorani</p>
            <p><b>Email:</b> tabish.noornai@gmail.com</p>
          </Col>
        </Row>
      
        <Form onSubmit={this.handleSubmit} style={{width:'100%'}}>
          <FormItem
            label={<b>Gender</b>}
          >
            {getFieldDecorator('gender', {
              initialValue:'u'
            })(
            <RadioGroup>
              <RadioButton value="f">Female</RadioButton>
              <RadioButton value="m">Male</RadioButton>
              <RadioButton value="o">Other</RadioButton>
              <RadioButton value="u">Undisclosed</RadioButton>
            </RadioGroup>
            )}
          </FormItem>

          <FormItem
            label={<b>Address</b>}
          >
            {getFieldDecorator('confirm', {})(
              <Input type="text" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>

          <FormItem
            label={<b>Contact Number</b>}
          >
            {getFieldDecorator('phone', {
              rules: [{ required: false, message: 'Please input your contact number!' }],
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
          </FormItem>

          <FormItem
          label={<b>Profile Picture</b>}
          >
          {getFieldDecorator('imgs')(
            <Upload {...imgProps}>
                <Button>
                <Icon type="upload" /> Click to Upload
                </Button>
            </Upload>)}
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit">Update</Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

const  ProfileCF = Form.create()(Profile);
export default ProfileCF;