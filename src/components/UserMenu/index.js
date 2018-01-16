import React from 'react';
import Signout from '../Signout';
import { Row, Col } from 'antd';

const UserMenu = (props)=>{
    return(
        <Row type="flex" justify="end" align="middle">
            <Col>
                Notification
            </Col>
            <Col>
                Manage List
            </Col>
            <Col>
                Settings
            </Col>
            <Col>
                <Signout 
                    signoutLoder={props.signoutLoder}
                    dispatch={props.dispatch}
                    token={props.token}
                />
            </Col>
        </Row>
    )
}

export default UserMenu;