import React from 'react';
import NotAuth from '../NotAuth';
import Notifications from './notifications';
import config from '../../../config';


const NotificationsValid = (props)=>{
    window.document.title=`${config.APP_NAME} - Notifications`
    const {auth} = props;
    if (auth!==false){
        return (
            <Notifications/>
        )
    } else return (<NotAuth />)
}

export default NotificationsValid