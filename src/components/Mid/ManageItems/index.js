import React from 'react';
import { Button, Tooltip, Row, Col } from 'antd';
import config from '../../../config';
import NotAuth from '../NotAuth';
import AddItem from './AddItem';
import ItemLists from './ItemLists';
import SortBy from './SortBy';
import {itemListsInitilized, fetchItemLists} from '../../../store/actions';

import { 
    showAddItem, 
    showAddItemCancel, 
    addItem } from '../../../store/actions';

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
    
    const saveFormRef = (Form) => {
        this.form = Form;
    }
   
    if (auth!==false){
        window.document.title=`${config.APP_NAME} - Manage Items`
        return (
        <div>
            <Row gutter={0} type="flex" 
            justify="center" 
            style= {{width:'100vw'}}>
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
                        ghost/>
                    </Tooltip>

                    <Tooltip placement="bottom" title="Add Item">
                        <Button 
                        style={{marginLeft:'10px'}}
                        type="primary" 
                        shape="circle" 
                        icon="plus" 
                        onClick={showModal} 
                        ghost/>
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
        )} else return (<NotAuth />)
    }
}

export default ManageItems