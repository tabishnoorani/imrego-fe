import React from 'react';
import {
  Button, 
  Card,
  Form, 
  Icon, 
  Input,
  Spin, 
  Tooltip, 
} from 'antd';
import {updatePassword} from '../../../store/actions'

const FormItem = Form.Item;

class Security extends React.Component {
  state = {
    updateDisable: true,
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => 
    {
      if (!err) {
        const {password, newPassword} = values;
        updatePassword(password, newPassword);
        this.setState({updateDisable: true});
        this.props.form.resetFields();
      }
    });
  }

  matchPassword (rule, value, callback) {
    const { getFieldValue, validateFieldsAndScroll, setFields } = this.props.form;
    switch(rule.field){
      case 'confirmPassword': {
        console.log('Confirm Password')
        if (getFieldValue('newPassword')===value){
          callback();                    
        } else callback('Password does not match with new password!')
        break;
      }
      case 'newPassword': {
        console.log('newPassword')
        const confirmPassword = getFieldValue('confirmPassword')
        if (confirmPassword!==undefined) {
          setFields({
            confirmPassword: {
              value: getFieldValue('confirmPassword'),
              message:"",
              errors: ""
            },
          });
          callback();
          break;
        } else callback();
        break;
      }
      case 'password':{
        console.log ('Iam here')
        callback();
        break;
      }
      default: {
        callback();
        break;
      }
    }

    validateFieldsAndScroll((err,values)=>{
      if (!err) {
        this.setState({updateDisable: false})
      } else {
        this.setState({updateDisable:true})
      }
    });
  }


  render() {
    const { 
      getFieldDecorator, 
      // getFieldValue, 
      // setFields 
    } = this.props.form;
    return (
      <Card title="Security" bordered={false} style={{ width: '100%', marginTop:'20px' }}>        
        <Spin size="large" spinning={this.props.security.loader}>
        <Form onSubmit={this.handleSubmit} style={{width:'100%'}}>
          
          <FormItem label= "Current Password">
          {getFieldDecorator('password', {
            rules: [
              { 
                required: true, 
                message: 'Please input your Password!' 
              },
              { 
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g , 
                message: 'The input is not valid Password!'
              },
            ],
          })(
            <Input type="password" />
          )}
          </FormItem>

          <FormItem
          label={(
            <span>
            New Password&nbsp;
            <Tooltip title={
              <div>
              <b>Password conditions:</b>
              <ul>
                <li>At least 8 characters</li>
                <li>Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number</li>
                <li>Can contain special characters</li>
              </ul>
              </div>
            }
            >
              <Icon type="question-circle-o" />
            </Tooltip>
            </span>
          )}
          >
          {getFieldDecorator('newPassword', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g , message: 'The input is not valid Password!'},
              { validator:  this.matchPassword.bind(this) },
            ],
          })(
            <Input type="password" disabled= {false}/>
          )}
          </FormItem>
          <FormItem
          label={(
            <span>
              Confirm Password
            </span>
          )}
          >
          {getFieldDecorator('confirmPassword', {
            rules: [
              { validator:  this.matchPassword.bind(this) }
            ],
          })(
            <Input type="password" disabled= {false}/>
          )}
          </FormItem>

          <FormItem>
           <Button disabled={this.state.updateDisable} type="primary" htmlType="submit">Update</Button>
          </FormItem>

        </Form>
        </Spin>
      </Card>
    );
  }
}

const  SecuirtyCF = Form.create()(Security);
export default SecuirtyCF;