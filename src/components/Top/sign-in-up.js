import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Signin from '../Signin';
import Signup from '../Signup';


const SignInUp = (props)=>{
    return(
    <Col>
      <Row type="flex" justify="end" align="middle">
        <Col><Signin/></Col>
        <Col><Signup/></Col>
      </Row>
      <Row type="flex" justify="end">
        <Col>{props.signinField}</Col> 
      </Row>
    </Col>
    );
}

const returnState = (store)=>{
    return({
      signinField: store.Status.msg.signinField 
    });
  } 
export default connect(returnState)(SignInUp);