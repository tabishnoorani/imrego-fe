import React from 'react';
import {
  Spin,
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
    updateDisable: true,
  }
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleChange(e){
    this.setState({updateDisable: false});
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
        this.setState({fileList:[file]});
        return false;
      },
      fileList: this.state.fileList,
      onChange: this.handleChange
    };

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '61',
    })(
      <Select style={{ width: 70 }}>
        <Option value="61">+61</Option>
      </Select>
    );

    const {user, profile} = this.props;
    const {fname, lname, email} = user;
    const {gender, address, contact, profilePicture, loader} = profile;
    const pp = (profilePicture!=='' && profilePicture!==undefined)?
              profilePicture : '/profile.png';

    return (
      <Card title="Profile" bordered={false} style={{ height: '100%', width: '100%' }}>
      <Spin size="large" spinning={loader}>
        <Row>
          <Col span={8} style={{padding:'0px 10px'}}>
            <img alt='' src={pp} style={{width:'100%'}}/>
          </Col>

          <Col span={16}>
            <p><b>First Name:</b> {fname}</p>
            <p><b>Last Name:</b> {lname}</p>
            <p><b>Email:</b> {email}</p>
          </Col>
        </Row>
      
        <Form onSubmit={this.handleSubmit} style={{width:'100%'}}>
          <FormItem
            label={<b>Gender</b>}
          >
            {getFieldDecorator('gender', {
              initialValue: gender
            })(
            <RadioGroup onChange={this.handleChange}>
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
            {getFieldDecorator('confirm', {
              initialValue: address
            })(
              <Input type="text" onChange={this.handleChange} onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>

          <FormItem
            label={<b>Contact Number</b>}
          >
            {getFieldDecorator('phone', {
              initialValue: contact
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} onChange={this.handleChange} />
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
            <Button type="primary" htmlType="submit" disabled={this.state.updateDisable}>Update</Button>
          </FormItem>
        </Form>
      </Spin>
      </Card>
    );
  }
}

const  ProfileCF = Form.create()(Profile);
export default ProfileCF;