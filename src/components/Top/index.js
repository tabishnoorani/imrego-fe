import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Layout } from 'antd';
import SignInUp from './sign-in-up';
import Logo from '../logo';
import Signout from '../Signout';

const { Header } = Layout;


const Top = (props)=>{ 
    return(
    <Header style={{
    background: "darkgray", 
    position: 'fixed', 
    width: '100%', 
    height:"auto",
    }}>
      <Row type="flex" justify="space-between" align="middle">
        <Col span={5}>
          <Logo />
        </Col>
        {(props.auth)? 
        <Signout 
        signoutLoder={props.signoutLoder}
        dispatch={props.dispatch}
        token={props.token}/>: 
        <SignInUp/>}  
      </Row>    
    </Header>
)}

const returnState = (store)=>{
    return({
      auth: store.Status.auth,
      signoutLoder: store.Status.loders.signout,
      token: store.User.token
    });
  } 
export default connect(returnState)(Top);
