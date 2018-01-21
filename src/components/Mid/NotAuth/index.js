import React from 'react';
import config from '../../../config';

const NotAuth = (props)=>{
    window.document.title=`${config.APP_NAME} - Not Authorize`
    return (
        <div>You are not authorized. Please login</div>
    ) 
}

export default NotAuth;