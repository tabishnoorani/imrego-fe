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

  constructor(props){
    super(props);
    this.state = {
      data:"",
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bnNpZ25lZFRva2VuIjp7InNpZCI6IjVhNTQxOTY3NzkxNTdjMWEyODllM2UxNyIsInVpZCI6IjVhNTJkNGMwYjk1OWZmMDQyODUxNjI4NiJ9LCJpYXQiOjE1MTU0NjA5Njd9.1J4tKvWB7oo4unPPZfPBTYfurQqZgeCO_JaF6Q5mPuw'
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData (event) {
    const token = this.state.token;
    axios.get(`${config.HOST_URL}/api`, 
            {headers: { authorization: `Bearer ${token}`}})
    .then((res)=>{
      this.setState ({data: res.data.msg})
    })
    .catch(function(err){});
  }

  render() {
    return (
    <Layout style={{background:"whitesmoke"}}>
      <Header style={{background: "darkgray", position: 'fixed', width: '100%', height:"auto" }}>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={5}>
            <Logo />
          </Col>
          <Col>
            <Row type="flex" justify="end" align="middle">
              <Col><Signin/></Col>
              <Col><Signup/></Col>
            </Row>
            <Row type="flex" justify="end">
            </Row>
              {/* <Signup/> */}
          </Col>
        </Row>
      </Header>
      
      <Content style={{ padding: '0 50px', marginTop: '150px', marginBottom:'20px' }}>
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
