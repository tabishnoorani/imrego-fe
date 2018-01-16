import React from 'react';
import { Button, Tooltip } from 'antd';
import { signout, userMenuSelect } from '../../store/actions';

const Signout = (props) =>{
    function Signout(){
        userMenuSelect(props.dispatch, "signout");
        signout(props.dispatch, props.token);
    }
    return(
        <Tooltip placement="topRight" title="Signout">
            <Button 
                type={(props.activeLink)?"primary":"secondary"} 
                shape="circle" 
                icon="logout" 
                loading={props.signoutLoder} 
                onClick={Signout} 
            />
        </Tooltip>
    );
}

export default Signout;