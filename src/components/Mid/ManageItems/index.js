import React from 'react';
import { Button, Tooltip, Row, Col } from 'antd';
import config from '../../../config';
import NotAuth from '../NotAuth';
import AddItem from './AddItem';
import ItemLists from './ItemLists';

import { 
    showAddItem, 
    showAddItemCancel, 
    addItem } from '../../../store/actions';

class ManageItems extends React.Component {
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
                addItemLoder={loder.addItem}
                onCancel={handleCancel.bind(this)}
                onCreate={handleCreate}
                DesSignupModal={desAddItemModal}
                token={token}
                />
                
                <ItemLists />

            </Row>           
                
        )} else return (<NotAuth />)
    }
}

export default ManageItems