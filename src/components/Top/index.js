import React from 'react';
import { connect } from 'react-redux';
import { Row, Layout, Card } from 'antd';
import Logo from './logo';
import Menu from './Menu';
import config from '../../config';

const { Header } = Layout;


const Top = (props)=>{ 
    return(
    <Header style={{
    background: config.THEME.BRIGHT_COLOR,
    boxShadow: '1px 0px 10px 0px gray',
    position: 'fixed', 
    width: '100%', 
    height:"auto",
    paddingTop: '20px',
    zIndex:'10'
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
