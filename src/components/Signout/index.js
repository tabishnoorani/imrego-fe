import React from 'react';
import { Button, Tooltip } from 'antd';
import { signout } from '../../store/actions';

const Signout = (props) =>{
    function Signout(){
        signout(props.dispatch, props.token);
    }
    return(
        <Tooltip placement="topRight" title="Signout">
            <Button  
                shape="circle" 
                icon="logout" 
                loading={props.signoutLoder} 
                onClick={Signout} 
            />
        </Tooltip>
    );
}

export default Signout;