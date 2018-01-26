import React from 'react';
import config from '../../../config';
import { connect } from 'react-redux';

const NotAuth = (props)=>{
    window.document.title=`${config.APP_NAME} - Not Authorize`
    return (
    <div>
        {(!props.loading?"You are not authorized. Please signin":"")}
    </div>
    ) 
}

const returnState = (store)=>{
    return({
      loading: store.Status.loading,
    });
  }
  
  export default connect(returnState)(NotAuth);