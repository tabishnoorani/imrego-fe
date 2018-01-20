import React from 'react';
import NotAuth from '../NotAuth';

const Notifications = (props)=>{
    const {auth} = props;
    if (auth!==false){
        return (
            <div>Notificaitons</div>
        )
    } else return (<NotAuth />)
}

export default Notifications