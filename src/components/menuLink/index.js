import React from 'react';
import { Button, Tooltip } from 'antd';
import { userMenuSelect } from '../../store/actions'
import { withRouter } from 'react-router-dom';


const MenuLink = (props) => {
    
    const { noPush, link, dispatch, activeLink, icon, callback, toolTip, history } = props
    
    function handleClick(){
        if (callback!==""){
            callback();
        }
        if (noPush!==true){
            history.push(link);
        }
        const dispProps = {
            noPush: noPush,
            link: link,
            icon: icon, 
            activeLink: activeLink,
            callback: callback,
            toolTip: toolTip
        }
    
        userMenuSelect(dispatch, dispProps);
    }
 
    const buttonSettings = {
        type:(activeLink)?"primary":"secondary",
        shape:"circle", 
        icon:icon,
        loading:false,
        onClick:handleClick
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