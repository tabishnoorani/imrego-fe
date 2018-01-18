import React from 'react';
import { Row, Col } from 'antd';
import MenuLink from '../menuLink';

const UserMenu = (props)=>{

    const { userMenu, dispatch } = props;
    
    return(
        <Row gutter={8} type="flex" justify="center" align="middle">
        {
            Object.keys(userMenu).map((key, index)=>{
                return (
                    <Col key={`userMenu ${key}`}>
                        <MenuLink 
                        {...userMenu[key]} 
                        dispatch={dispatch}/>
                    </Col>
                )
            })
        }
        </Row>
    )
}

export default UserMenu;