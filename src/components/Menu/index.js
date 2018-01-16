import React from 'react';
import { Col } from 'antd';
import { connect } from 'react-redux';

import SignInUp from '../sign-in-up';
import UserMenu from '../UserMenu'

const Menu = (props) => {
    return(
    <Col>
        {(props.auth)? 
            <UserMenu 
            signoutLoder={props.signoutLoder}
            dispatch={props.dispatch}
            token={props.token}/>: 
            <SignInUp/>}
    </Col>
    )
}

const returnState = (store)=>{
    return({
      auth: store.Status.auth,
      signoutLoder: store.Status.loders.signout,
      token: store.User.token
    });
  } 

export default connect(returnState)(Menu);
