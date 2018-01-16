import React from 'react';
import { Button, Tooltip} from 'antd';
import { userMenuSelect } from '../../store/actions'

const ManageItems = (props) => {
    
    function handleClick(){
        userMenuSelect(props.dispatch, "manageItems");
    }

    const buttonSettings = {
        type:(props.activeLink)?"primary":"secondary",
        shape:"circle", 
        icon:"qrcode",
        loading:false,
        onClick:handleClick 
    };
    
    const TooltipSettings = {
        placement:"top",
        title:"Manage Marked Items"
    };

    return(
        <div>
            <Tooltip {...TooltipSettings} >
                <Button {...buttonSettings}/>
            </Tooltip>
        </div>
    )
}

export default ManageItems