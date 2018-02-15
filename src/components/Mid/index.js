import React from 'react';
import { Row, Layout } from 'antd';
import {connect} from 'react-redux';
import SearchBar from './SearchBar';
import Home from './Home';
import Notifications from './Notifications';
import Settings from './Settings';
import ManageItems from './ManageItems';
import NoAuth from './NotAuth';
// import {checkPathname} from '../../store/actions';

const { Content } = Layout;

const Mid = (props)=> {
    
    const { auth, dispatch, token, Mid, pathname } = props;

    const Pathname = pathname.split('/')[1];

    const ManageItemsProps = {auth, dispatch, token, ...Mid.manageitems}

    const Render = (auth)?
        <Row type="flex" justify="center">
            {(Pathname==='notifications')?
            <Notifications auth={auth}/>:""}
            {(Pathname==='manageitems')?
            <ManageItems {...ManageItemsProps}/>:""}
            {(Pathname==='settings')?
            <Settings auth={auth}/>:""}
        </Row> 
        : <NoAuth/>
    
    return(
        <Content style={{  
            marginTop: '150px', 
            marginBottom:'20px',
            height: '100%'
            }}>

            {(Pathname==='home'||Pathname==='')?
                <div>
                    <SearchBar/>
                    {(Pathname==='home')?
                    <Home auth={auth}/>:""}
                </div>
                :Render}
            
            {/* {Render} */}
            
            {/* {(Pathname==='home'||Pathname==='')?<SearchBar/>:""}                
            <Row type="flex" justify="center">
                {(Pathname==='home')?
                <Home auth={auth}/>:""}
                {(Pathname==='notifications')?
                <Notifications auth={auth}/>:""}
                {(Pathname==='manageitems')?
                <ManageItems {...ManageItemsProps}/>:""}
                {(Pathname==='settings')?
                <Settings auth={auth}/>:""}
            </Row> */}
        </Content>
    );
}

const returnState = (store)=>{
    return({
      pathname: store.router.location.pathname
    });
  }

export default connect(returnState)(Mid);
