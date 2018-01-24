import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
// import config from './config';
import './App.css';
import Top from './components/Top';
import Mid from './components/Mid';
import Bottom from './components/Bottom';
import { initializeToken } from './store/actions';

class App extends Component {

    componentWillMount(){
      const {pathname, dispatch} = this.props
      const token = localStorage.getItem('token');
      initializeToken(dispatch, token, pathname);
      console.log(pathname);
    }

  render() {
    const {auth, token, mid, dispatch} = this.props;
    return (
    <Layout style={{background:"whitesmoke"}}>
    
      <Top />
      
      <Mid 
        auth={auth}
        token={token}
        dispatch = {dispatch}
        Mid = {mid}/>
      
      <Bottom />
    
    </Layout>
    );
  }
}

const returnState = (store)=>{
  return({
    UserMenu: store.UserMenu,
    auth: store.Status.auth,
    token: store.User.token,
    mid: store.Mid,
    pathname: store.router.location.pathname
  });
}

export default connect(returnState)(App);
