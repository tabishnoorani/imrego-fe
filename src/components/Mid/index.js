import React from 'react';
import SearchBar from '../SearchBar';
import { Row, Col, Layout } from 'antd'

const { Content } = Layout;

const Mid = (props)=> {
    return(
        <Content style={{ 
            padding: '0 50px', 
            marginTop: '150px', 
            marginBottom:'20px' 
            }}>
            <Row type="flex" justify="center">
                <Col span={20}>
                    <SearchBar />
                </Col>
            </Row>
        </Content>
    );
}

export default Mid;