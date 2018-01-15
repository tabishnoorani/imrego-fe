import React from 'react';
import { Affix, Layout } from 'antd';

const { Footer } = Layout;

const Bottom =(props) => {
    return(
        <Affix offsetBottom={0}>
            <Footer style={{ 
                background: "lightgray", 
                textAlign: 'center', 
                padding: '0px', 
                margin: '0px' }}>
                <b>IMREGO</b> ©2016 - Created by OLEAW
            </Footer>
        </Affix>
    );
}

export default Bottom;