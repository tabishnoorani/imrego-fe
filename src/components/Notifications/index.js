import React from 'react';
import { Button, Tooltip} from 'antd';
import { userMenuSelect } from '../../store/actions'


const Notifications = (props) => {
    
    function handleClick(){
        userMenuSelect(props.dispatch, "notification");
    }

    const buttonSettings = {
        type:(props.activeLink)?"primary":"secondary",
        shape:"circle", 
        icon:"notification",
        loading:false,
        onClick:handleClick 
    };
    
    const TooltipSettings = {
        placement:"top",
        title:"Notifications"
    };

    return(
        <div>
            <Tooltip {...TooltipSettings} >
                <Button {...buttonSettings}/>
            </Tooltip>
        </div>
    )
}

export default Notifications