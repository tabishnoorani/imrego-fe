import React from 'react';
import NotAuth from '../NotAuth';
import config from '../../../config';
import Setting from './Settings';
// import ImageUploader from './ImageUploader';

const Settings = (props)=>{
    window.document.title=`${config.APP_NAME} - Settings`
    const {auth} = props;
    if (auth!==false){
        return (
            <Setting/>
        )
    } else return (<NotAuth />)
}

export default Settings;