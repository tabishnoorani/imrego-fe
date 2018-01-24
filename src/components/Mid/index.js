import React from 'react';
import { Row, Layout } from 'antd';
import { Route } from 'react-router-dom';
import SearchBar from '../SearchBar';
import Home from './Home';
import Notifications from './Notifications';
import Settings from './Settings';
import ManageItems from './ManageItems';


const { Content } = Layout;

const Mid = (props)=> {
    
    const { auth, dispatch, token, Mid } = props;

    const ManageItemsProps = {auth, dispatch, token, ...Mid.manageitems}

    return(
        <Content style={{ 
            // padding: '0 50px', 
            marginTop: '80px', 
            marginBottom:'20px' 
            }}>
                
            <Route exact path = {'/home'}
            render={()=> <SearchBar />} />
            
            <Row type="flex" justify="center">
                <Route 
                exact path={'/home'} 
                render={() => <Home auth={auth}/>}/>

                <Route 
                exact path={'/notifications'} 
                render={()=> <Notifications auth={auth}/>}/>

                <Route 
                exact path={'/manageitems'} 
                render={()=><ManageItems {...ManageItemsProps}/>}/>
                
                <Route 
                exact path={'/settings'} 
                render={()=><Settings auth={auth}/>}/>
            </Row>
        </Content>
    );
}

export default Mid;
