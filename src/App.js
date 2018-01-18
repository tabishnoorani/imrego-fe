import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import Top from './components/Top';
import Mid from './components/Mid';
import Bottom from './components/Bottom';
import { initializeToken, userMenuSelect } from './store/actions';

class App extends Component {
  componentWillMount(){
    const token = localStorage.getItem('token');
    if (token) {
      initializeToken(this.props.dispatch, token);
    }
  }

  componentDidMount(){
    const link = this.props.location.pathname;
    const {UserMenu} = this.props;
    const activeLink = link.slice(1);
    const activeMenu = UserMenu[activeLink] ? UserMenu[activeLink] : "";
    if (activeLink!=="" && activeMenu!=="") {
      userMenuSelect(
        this.props.dispatch,
        UserMenu[activeLink]
      );
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

const returnState = (store)=>{
  return({
    UserMenu: store.UserMenu
  });
}

export default withRouter(connect(returnState)(App));
