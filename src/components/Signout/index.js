import React from 'react';
import { Button } from 'antd';
import { signout } from '../../store/actions';

const Signout = (props) =>{
    function Signout(){
        signout(props.dispatch, props.token);
    }
    return(
        <Button 
        type="primary" 
        shape="circle" 
        icon="search" 
        loading={props.signoutLoder} 
        onClick={Signout} />
    );
}

export default Signout;