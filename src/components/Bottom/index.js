import React from 'react';
import { Affix, Layout } from 'antd';

const { Footer } = Layout;

const Bottom =(props) => {
    return(
        <div style={{    
            position: "fixed",
            bottom: '0',
            left: '0',
            width: '100%'}}>

            <Footer style={{ 
                background: "lightgray", 
                textAlign: 'center', 
                padding: '0px', 
                margin: '0px' }}>
                <b>IMREGO</b> ©2016 - Created by OLEAW
            </Footer>
        </div>
    );
}

export default Bottom;