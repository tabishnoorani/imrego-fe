import React from 'react';
import NotAuth from '../NotAuth';
import config from '../../../config';

const Settings = (props)=>{
    window.document.title=`${config.APP_NAME} - Settings`
    const {auth} = props;
    if (auth!==false){
        return (
            <div>Setting</div>
        )
    } else return (<NotAuth />)
}

export default Settings;