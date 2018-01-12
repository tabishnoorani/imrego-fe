import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Layout } from 'antd';
import SignInUp from './sign-in-up';
import Logo from '../logo';

const { Header } = Layout;

const Top = (props)=>{ 
    return(
    <Header style={{
        background: "darkgray", 
        position: 'fixed', 
        width: '100%', 
        height:"auto"
        }}>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={5}>
            <Logo />
          </Col>
          {(props.auth)? "Welcome": <SignInUp/>}  
        </Row>
        
    </Header>
)}

const returnState = (store)=>{
    return({
      auth: store.Status.auth 
    });
  } 
export default connect(returnState)(Top);
