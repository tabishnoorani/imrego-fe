import React from 'react';
import { connect } from 'react-redux';
import { Row, Layout } from 'antd';
import Logo from '../logo';
import Menu from '../Menu';

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
        <Logo />
        <Menu/>
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
