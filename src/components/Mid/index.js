import React from 'react';
import { Row, Col, Layout } from 'antd';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBar from '../SearchBar';
import Home from './Home';
import Notifications from './Notifications';
import Settings from './Settings';
import ManageItems from './ManageItems';


const { Content } = Layout;

const Mid = (props)=> {
    
    const { auth, token } = props;

    return(
        <Content style={{ 
            padding: '0 50px', 
            marginTop: '80px', 
            marginBottom:'20px' 
            }}>
                
            <Route exact path={['/', '/home']}
            render={()=> <SearchBar />} />

            <Row type="flex" justify="center">
                <Col>
                    <Route 
                    exact path={'/home'} 
                    render={() => <Home auth={auth}/>}/>

                    <Route 
                    exact path={'/notifications'} 
                    render={()=> <Notifications auth={auth}/>}/>

                    <Route 
                    exact path={'/manageitems'} 
                    render={()=><ManageItems auth={auth}/>}/>
                    
                    <Route 
                    exact path={'/settings'} 
                    render={()=><Settings auth={auth}/>}/>


                </Col>
            </Row>
        </Content>
    );
}

export default Mid;
