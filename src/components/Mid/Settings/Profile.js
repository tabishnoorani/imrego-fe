import React from 'react';
import moment from 'moment';
import {
  Button, 
  Card,
  Col, 
  DatePicker,
  Form, 
  Icon,  
  Input,
  Popconfirm,  
  Radio, 
  Row,
  Select, 
  Spin,
  Tag,
  Tooltip,
  Upload,
} from 'antd';
import {updateProfile, removeImg} from '../../../store/actions';
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
    this.props.form.validateFieldsAndScroll((err, values) => 
    {
      if (!err) {
        const {_id} = this.props.profile;
        const file = (values.imgs!==undefined) ? values.imgs.fileList[0] : "";
        const formData = new FormData();
        formData.append('id', _id);
        formData.append('gender', values.gender);
        formData.append('dob', values.dob);
        formData.append('address', values.address);
        formData.append('prefix', values.prefix)
        formData.append('contact', values.phone);
        formData.append('file', file);
        updateProfile(formData);
        this.setState({fileList: [],
          updateDisable: true});
      }
    });
  }

  handleChange(e){
    this.setState({updateDisable: false});
  }

  delImg(){
    removeImg(this.props.profile._id)
  }

  render() {
    const Style={
      allCenter:{
          display:'flex', 
          height: '100%', 
          justifyContent:'center', 
          alignItems:'center'
      }
    }

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
    const {fname, lname, email, creationDate} = user;
    const {
      dob, 
      gender, 
      contact, 
      address, 
      profilePicture, 
      modifiedDate,
      verified, 
      loader
    } = profile;
    const modifieddate = moment(modifiedDate||creationDate).format(config.DATE_FORMAT);
    const modifiedtime = moment(modifiedDate||creationDate).format(config.TIME_FORMAT);
    const pp = (profilePicture!=='' && profilePicture!==undefined)?
              profilePicture : '/profile.png';
    const vtag = (verified)? ["green", "Verified"] : ["red", "Not Verified!"];
    const vtext = (verified)? "You are a verified user!" : "Please check your registered email and click the link that has been sent for verification.";
    const deleteImg = (profilePicture==='')? "" :
      <Popconfirm 
      placement="bottom" 
      title="Are you sure you want to remove the profile picture?" 
      onConfirm={this.delImg.bind(this)} 
      okText="Yes" 
      cancelText="No">
        <Button 
        type="danger" 
        size="small"
        shape="circle" 
        icon="delete" 
        // ghost
        style={{position:"absolute", right:'10px'}}
        />
      </Popconfirm>

    return (
      <Card title="Profile" bordered={false} style={{ height: '100%', width: '100%' }}>
      <Spin size="large" spinning={loader}>
        <Row>
          <Col span={8} style={{padding:'0px 10px'}}>
            <div style={{height:'100%'}}>
              {deleteImg}
              <img alt='' src={pp} style={{width:'100%'}}/>
            </div>
          </Col>

          <Col span={16}>
            <p><b>First Name:</b> {fname}</p>
            <p><b>Last Name:</b> {lname}</p>
            <p><b>Email:</b> {email}</p>
            <p><b>Last Modified:</b> {modifieddate} <i>({modifiedtime})</i></p>
            <Tooltip placement="top" title={vtext}>
              <Tag color={vtag[0]}>{vtag[1]}</Tag>
            </Tooltip>
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
            label={<b>Date of birth</b>}
          >
            {getFieldDecorator('dob', {
              initialValue: moment(dob)
            })(
              <DatePicker 
                onChange={this.handleChange} 
                format={config.DATE_FORMAT} />
            )}
          </FormItem>

          <FormItem
            label={<b>Address</b>}
          >
            {getFieldDecorator('address', {
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