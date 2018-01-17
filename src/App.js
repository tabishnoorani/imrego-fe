import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import './App.css';
import Top from './components/Top';
import Mid from './components/Mid';
import Bottom from './components/Bottom';
import { initializeToken } from './store/actions';

class App extends Component {
  componentWillMount(){
    const token = localStorage.getItem('token');
    if (token) {
      initializeToken(this.props.dispatch, token);
    }
  }
  render() {  
    return (
    <Layout style={{background:"whitesmoke"}}>
      <Top />
      <Mid />
      <Bottom />
    </Layout>
    );
  }
}

export default connect()(App);
