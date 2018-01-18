import React from 'react';
import { Button, Tooltip } from 'antd';
import { userMenuSelect } from '../../store/actions'
import { withRouter } from 'react-router-dom';


const MenuLink = (props) => {
// class MenuLink extends React.Component{
    const { link, dispatch, activeLink, icon, toolTip, history, location } = props
    
    function handleClick(){
        history.push(link);
        const dispProps = {
            link: link,
            icon: icon, 
            activeLink: activeLink,
            toolTip: toolTip
        }
    
        userMenuSelect(dispatch, dispProps);
    }

    const localLink = (location.pathname==`/${link}`);

    const buttonSettings = {
        type:(localLink||activeLink)?"primary":"secondary",
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