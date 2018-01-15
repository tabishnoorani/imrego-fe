import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.css';
import Top from './components/Top';
import Mid from './components/Mid';
import Bottom from './components/Bottom';

class App extends Component {
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

export default App;
