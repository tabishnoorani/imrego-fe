import React from 'react';
import { Button, Tooltip, Row, Col } from 'antd';
import config from '../../../config';
import NotAuth from '../NotAuth';
import AddItem from './AddItem';
import {showAddItem, showAddItemCancel} from '../../../store/actions';

const ManageItems = (props)=>{
    
    const { 
        auth, 
        dispatch, 
        showAddItemModal, 
        desAddItemModal, 
        loder } = props;
    
    const showModal = () => {
        showAddItem(dispatch);
    }
    
    const handleCancel = () => {
        showAddItemCancel(dispatch);
    }
    
    const handleCreate = () => {
        // const form = this.form;
        // form.validateFields((err, values) => {
        //     if (err) {
        //     return;
        //     }
        //     signupCreate(this.props.dispatch, values, this.form);
        // });
    }
    
    const saveFormRef = (form) => {
        this.form = form;
    }
   
    if (auth!==false){
        window.document.title=`${config.APP_NAME} - Manage Items`
        return (
            <Row type="flex" justify="end" style= {{width:'100%'}}>
                <Col span={22}>
                    <h2 style={{display:"block",margin:'auto'}}>Manage Items</h2>
                </Col>
                <Col span={2}>
                    <Tooltip placement="bottom" title="Add Item">
                        <Button 
                        type="primary" 
                        shape="circle" 
                        icon="plus" 
                        onClick={showModal} />
                    </Tooltip>
                </Col>
                <AddItem
                ref={saveFormRef}
                visible={showAddItemModal}
                addItemLoder={loder.addItemLoder}
                onCancel={handleCancel.bind(this)}
                onCreate={handleCreate}
                DesSignupModal={desAddItemModal}
                />
            </Row>
                
        )
    } else return (<NotAuth />)
}

export default ManageItems