import React from 'react';
import { Row, Col } from 'antd';
import Signout from '../Signout';
import Notifications from '../Notifications';
import ManageItems from '../ManageItems';
import Settings from '../Settings';

const UserMenu = (props)=>{

    const { notification, manageItems, settings, signout } = props.userMenuSelect;

    return(
        <Row gutter={16} type="flex" justify="center" align="middle">
            <Col>
                <Notifications dispatch={props.dispatch} activeLink = {notification}/>
            </Col>
            <Col>
                <ManageItems dispatch={props.dispatch} activeLink = {manageItems}/>
            </Col>
            <Col>
                <Settings dispatch={props.dispatch} activeLink = {settings}/>
            </Col>
            <Col>
                <Signout 
                    activeLink = {signout}
                    signoutLoder={props.signoutLoder}
                    dispatch={props.dispatch}
                    token={props.token}
                />
            </Col>
        </Row>
    )
}

export default UserMenu;