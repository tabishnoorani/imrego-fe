import config from './config';
import React, { Component } from 'react';
import axios from 'axios';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Logo from './components/logo/index';
import SearchBar from './components/SearchBar';
import { Row, Col, Affix, Layout } from 'antd';
import './App.css';
import { connect } from 'react-redux';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    const SignedIn = (this.props.Status.auth)?"":(
      <Col>
        <Row type="flex" justify="end" align="middle">
          <Col><Signin/></Col>
          <Col><Signup/></Col>
        </Row>
        <Row type="flex" justify="end">
        {/* Conver this to permanent notification */}
          <Col>{this.props.Status.msg.signinFiled}</Col> 
        </Row>
      </Col>);
      
    return (
    <Layout style={{background:"whitesmoke"}}>
      <Header style={{background: "darkgray", position: 'fixed', width: '100%', height:"auto" }}>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={5}>
            <Logo />
          </Col>
          {SignedIn}
        </Row>
      </Header>
      
      <Content style={{ padding: '0 50px', marginTop: '150px', marginBottom:'20px' }}>
        {`${this.props.User.fname} 
        ${this.props.User.lname} 
        ${this.props.User.email}`}
        <Row type="flex" justify="center">
          <Col span={20}>
            <SearchBar />
          </Col>
        </Row>
      </Content>

      <Affix offsetBottom={0}>
        <Footer style={{ background: "lightgray", textAlign: 'center', padding: '0px', margin: '0px' }}>
          <b>IMREGO</b> ©2016 - Created by OLEAW
        </Footer>
      </Affix>
    </Layout>
    );
  }
}

const returnState = (store)=>{
  return({
    User: store.User, 
    Status: store.Status 
  });
}

export default connect(returnState)(App);
