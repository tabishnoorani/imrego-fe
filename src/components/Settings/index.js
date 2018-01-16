import React from 'react';
import { Button, Tooltip} from 'antd';
import { userMenuSelect } from '../../store/actions'

const Settings = (props) => {

    function handleClick(){
        userMenuSelect(props.dispatch, "settings");
    }
    
    const buttonSettings = {
        type:(props.activeLink)?"primary":"secondary",
        shape:"circle", 
        icon:"setting",
        loading:false,
        onClick: handleClick
    };
    
    const TooltipSettings = {
        placement:"top",
        title:"Settings"
    };

    return(
        <div>
            <Tooltip {...TooltipSettings} >
                <Button {...buttonSettings}/>
            </Tooltip>
        </div>
    )
}

export default Settings