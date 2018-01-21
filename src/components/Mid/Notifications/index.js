import React from 'react';
import NotAuth from '../NotAuth';
import config from '../../../config';

const Notifications = (props)=>{
    window.document.title=`${config.APP_NAME} - Notifications`
    const {auth} = props;
    if (auth!==false){
        return (
            <div>Notificaitons</div>
        )
    } else return (<NotAuth />)
}

export default Notifications