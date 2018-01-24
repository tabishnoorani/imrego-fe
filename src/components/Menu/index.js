import React from 'react';
import { Col } from 'antd';
import { connect } from 'react-redux';
import UserMenu from '../UserMenu'
import SignInUp from '../sign-in-up';

const Menu = (props) => {
    return(
    <Col>
        {(props.auth)? 
            <UserMenu 
            signoutLoder={props.signoutLoder}
            dispatch={props.dispatch}
            token={props.token}
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
      signoutLoder: store.Status.loders.signout,
      token: store.User.token,
      userMenu: store.UserMenu,
      loading: store.Status.loading
    });
  } 

export default connect(returnState)(Menu);
