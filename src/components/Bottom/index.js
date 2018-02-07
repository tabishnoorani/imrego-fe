import React from 'react';
import { Layout } from 'antd';
import config from '../../config';

const { Footer } = Layout;

const Bottom =(props) => {
    return(
        <div style={{    
            position: "fixed",
            bottom: '0',
            left: '0',
            width: '100%'}}>

            <Footer style={{ 
                background: config.THEME.BRIGHT_COLOR,
                color: config.THEME.PRIMARY_COLOR, 
                textAlign: 'center', 
                padding: '0px', 
                margin: '0px' }}>
                <b>IMREGO</b> 2018 - Created by OLEAW
            </Footer>
        </div>
    );
}

export default Bottom;