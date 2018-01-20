import React from 'react';
import NotAuth from '../NotAuth';

const Settings = (props)=>{
    const {auth} = props;
    if (auth!==false){
        return (
            <div>Setting</div>
        )
    } else return (<NotAuth />)
}

export default Settings;