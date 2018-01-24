import React from 'react';
import { Col } from 'antd';
import { connect } from 'react-redux';
import UserMenu from './UserMenu'
import SignInUp from './sign-in-up';

const Menu = (props) => {
    return(
    <Col>
        {(props.auth)? 
            <UserMenu 
            // signoutLoder={props.signoutLoder}
            dispatch={props.dispatch}
            token={props.token}
            pathname={props.pathname}
            userMenu={props.userMenu}/>
            : 
            <SignInUp auth={props.auth} 
            loading={props.loading}/>}
    </Col>
    )
}

const returnState = (store)=>{
    return({
      auth: store.Status.auth,
      token: store.User.token,
      userMenu: store.UserMenu,
      loading: store.Status.loading,
      pathname: store.router.location.pathname
    });
  } 

export default connect(returnState)(Menu);
