import React from 'react';
import { Col } from 'antd';
import config from '../../../config';
import {Push} from '../../../store/actions';

const Logo = (props)=>{
    function clickHandle(){
        Push('/home');
    }
    const style ={
        logo:{
            fontSize: '4em',
            fontWeight: 'bold',
            color: config.THEME.PRIMARY_COLOR,
            paddingBottom: '10px',
            cursor: 'pointer',
        },
        logoIcon:{
            background: config.THEME.PRIMARY_COLOR,
            fontWeight:"800",
            padding: '0px 10px',
            color: config.THEME.BRIGHT_COLOR
        }
    }
    return (
        <Col span={5}>
            <div style={style.logo} onClick={clickHandle}>
                <span style={style.logoIcon}>IM</span>REGO
            </div>
        </Col>
    )
}

export default Logo;