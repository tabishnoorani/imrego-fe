import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import { Row, Col, Affix, Layout } from 'antd';
import './App.css';
import { connect } from 'react-redux';
import Top from './components/Top';

const { Content, Footer } = Layout;

class App extends Component {
  render() {  
    return (
    <Layout style={{background:"whitesmoke"}}>
      <Top />
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
