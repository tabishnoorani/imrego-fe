import React from 'react';
import NotAuth from '../NotAuth';

const ManageItems = (props)=>{
    const {auth} = props;
    if (auth!==false){
        return (
            <div>Manage Items</div>
        )
    } else return (<NotAuth />)
}

export default ManageItems