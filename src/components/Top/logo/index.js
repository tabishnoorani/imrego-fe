import React from 'react';
import { Col } from 'antd';
import './style/style.css';

const Logo = (props)=>{
    return (
        <Col span={5}>
            <div className='logo'>
                IMREGO
            </div>
        </Col>
    )
}

export default Logo;