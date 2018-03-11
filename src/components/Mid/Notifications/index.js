import React from 'react';
import NotAuth from '../NotAuth';
import config from '../../../config';
import {fetchNotifications} from '../../../store/actions';


const Notifications = (props)=>{
    window.document.title=`${config.APP_NAME} - Notifications`
    const {auth} = props;
    if (auth!==false){
        return (
            <div onClick={()=>fetchNotifications()}>Notificaitons</div>
        )
    } else return (<NotAuth />)
}

export default Notifications