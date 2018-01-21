import React from 'react';
import config from '../../../config';
import NotAuth from '../NotAuth';

const ManageItems = (props)=>{
    window.document.title=`${config.APP_NAME} - Manage Items`
    const {auth} = props;
    if (auth!==false){
        return (
            <div>

            </div>
        )
    } else return (<NotAuth />)
}

export default ManageItems