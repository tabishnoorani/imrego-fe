import React from 'react';
import { Button, Tooltip, Row, Col, Tabs } from 'antd';
import { connect } from 'react-redux';
import config from '../../../config';
import NotAuth from '../NotAuth';
import AddItem from './AddItem';
import ItemLists from './ItemLists';
import FoundLists from './FoundLists/';
import SortBy from './SortBy';
import SearchBar from '../SearchBar';
import {
    itemListsInitilized, fetchItemLists, Push, 
    showAddItem, showAddItemCancel, addItem } from '../../../store/actions';

const TabPane = Tabs.TabPane; 

class ManageItems extends React.Component {
    componentWillMount(){
        if (!this.props.initialized){
            itemListsInitilized();
        }
    }

    render(){
    const { 
        auth, 
        dispatch, 
        showAddItemModal, 
        desAddItemModal, 
        loder, token } = this.props;
    
    const showModal = () => {
        showAddItem(dispatch);
    }
    
    const handleCancel = () => {
        showAddItemCancel(dispatch);
    }

    const FetchItemLists= ()=>{
        fetchItemLists('Item List Reloaded!')
    }
    
    const handleCreate = () => {
        const form= this.form;
        form.validateFields((err, values) => {
            if (!err) {
                addItem(dispatch, values, token);
            }
        });
    }

    const pushValue = (value) => {
        switch (value) {
            case '1':
                Push(`/manageitems`);
                break;
            
            case '2':
                Push(`/manageitems/founditems`);
                break;
        
            default:
                break;
        }      
    }

    const setActiveKey = () => {
        switch (this.props.pathname) {
            case '/manageitems':
            return ('1')
            // break;

            case '/manageitems/founditems':
            return ('2')
            // break;
        
            default:
            return('1')
            // break;
        }
    }
    
    const saveFormRef = (Form) => {
        this.form = Form;
    }
   
    if (auth!==false){
        window.document.title=`${config.APP_NAME} - Manage Items`
        return (
        <Tabs activeKey={setActiveKey()} defaultActiveKey="1" tabPosition='top' size='large' onChange={(activeKey)=>{pushValue(activeKey)}}>
        
        <TabPane tab="Manage Items" key="1">
        <div>
            <Row gutter={0} type="flex" 
            justify="center" 
            style= {{width:'100%'}}>
                <Col span={20}>
                    <SortBy/>
                </Col>

                <Col span={2}>
                    <Tooltip placement="bottom" title="Reload List">
                        <Button 
                        type="primary" 
                        shape="circle" 
                        icon="reload" 
                        onClick={FetchItemLists} 
                        />
                    </Tooltip>

                    <Tooltip placement="bottom" title="Add Item">
                        <Button 
                        style={{marginLeft:'10px'}}
                        type="primary" 
                        shape="circle" 
                        icon="plus" 
                        onClick={showModal} 
                        />
                    </Tooltip>
                </Col>

                <AddItem
                ref={saveFormRef}
                visible={showAddItemModal}
                addItemLoder={loder.addItem}
                onCancel={handleCancel.bind(this)}
                onCreate={handleCreate}
                DesSignupModal={desAddItemModal}
                token={token}
                />
            </Row>           
            
            <ItemLists />
            
        </div> 
        </TabPane>

        <TabPane tab="Found Items" key="2">
        <div>
            <Row gutter={0} type="flex" 
            justify="center" 
            style= {{width:'100%'}}>
                <Col span={20}>
                    <SearchBar 
                    title='ADD THE FOUND ITEM:'
                    iconType='plus'/>
                </Col>
            </Row>           
            
            <FoundLists />
            
        </div>
        </TabPane>
        </Tabs>
        )} else return (<NotAuth />)
    }
}

const returnState = (store)=>{
    return({
      pathname: store.router.location.pathname
    });
}

export default connect(returnState)(ManageItems);