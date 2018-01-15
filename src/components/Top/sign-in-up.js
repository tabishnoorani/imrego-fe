import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, notification } from 'antd';
import Signin from '../Signin';
import Signup from '../Signup';
import { resetSigninNotification } from '../../store/actions/index'

class SignInUp extends React.Component{
  aNotification(message) {
    if (this.props.signinField!==""){
      notification.open({
        message: 'Invalid User',
        description: message,
        duration: 0,
      });
      resetSigninNotification(this.props.dispatch);
    }
  }

  render(){
    this.aNotification(this.props.signinField);
    return(
    <Col>
      <Row type="flex" justify="end" align="middle">
        <Col><Signin/></Col>
        <Col><Signup/></Col>
      </Row>
    </Col>
    );
  }
}

const returnState = (store)=>{
    return({
      signinField: store.Status.msg.signinField 
    });
  } 
export default connect(returnState)(SignInUp);