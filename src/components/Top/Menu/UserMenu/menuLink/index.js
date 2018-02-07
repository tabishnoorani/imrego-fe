import React from 'react';
import { Button, Tooltip } from 'antd';
import { withRouter } from 'react-router-dom';

const MenuLink = (props) => {
    
    const { noPush, 
            link, 
            icon, 
            callback, 
            toolTip, 
            history,
            loading,
            pathname} = props
            
    const linkName = pathname.split('/')
    var activeLink = (linkName[1]===link);

    function handleClick(){
        if (callback!==""){
            callback();
        }
        if (noPush!==true){
            history.push(`/${link}`);
        }
    }
    
    const buttonSettings = {
        // type:(activeLink)?"primary":"secondary",
        type:"primary",
        // shape:"circle", 
        size:"large",
        icon:icon,
        loading:loading,
        onClick:handleClick,
        ghost: !activeLink,
        style:{
            fontSize: '24px',
            border: 'none',
            width:'80px',
            borderRadius: '0px'
        }
    };
    
    const TooltipSettings = {
        placement: toolTip.placement || "top",
        title: toolTip.title || "Title"
    };

    return(
            <Tooltip {...TooltipSettings} >
                <Button {...buttonSettings}/>
            </Tooltip>
    )
}

export default withRouter(MenuLink)