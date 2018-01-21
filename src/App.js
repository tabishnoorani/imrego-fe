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
    const {auth, token} = this.props;
    return (
    <Layout style={{background:"whitesmoke"}}>
      <Top />
      <Mid auth={auth}
        token={token}/>
      <Bottom />
    </Layout>
    );
  }
}

const returnState = (store)=>{
  return({
    UserMenu: store.UserMenu,
    auth: store.Status.auth,
    token: store.User.token
  });
}

export default connect(returnState)(App);
