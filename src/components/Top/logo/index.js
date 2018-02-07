import React from 'react';
import { Col } from 'antd';
import './style/style.css';

const Logo = (props)=>{
    return (
        <Col span={5}>
            <div className='logo'>
                <span class='logoIcon'>IM</span>REGO
            </div>
        </Col>
    )
}

export default Logo;