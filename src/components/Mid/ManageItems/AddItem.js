import React, { Component } from 'react';
import { Form, Input, Modal } from 'antd';
const FormItem = Form.Item;
const {TextArea} = Input;  

class AddItem extends Component {
    
    render() {
        const { getFieldDecorator } = this.props.form;
        
        const { 
            visible, 
            onCancel, 
            onCreate, 
            addItemLoder, 
            desAddItemModal } = this.props;
        
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
        <Modal 
        visible={visible}
        title="Add an Item"
        okText="Add"
        confirmLoading = {addItemLoder}
        onCancel= {onCancel}
        onOk = {onCreate}
        destroyOnClose={desAddItemModal}>

        <Form>
            <FormItem
            {...formItemLayout}
            label="Title">
            {getFieldDecorator('title', {
                rules: [{ 
                required: true, message: 'Please enter the title.', 
                whitespace: true }],
            })(<Input disabled= {addItemLoder}/>)}
            </FormItem>

            <FormItem
            {...formItemLayout}
            label="Catagory">
            {getFieldDecorator('catagory', {
                rules: [{ 
                    required: true, 
                    message: 'Item Catagory.', 
                    whitespace: true }],
            })(<Input disabled= {addItemLoder}/>)}
            </FormItem>

            <FormItem
            {...formItemLayout}
            label="Description">
            {getFieldDecorator('description', {
                rules: [{ 
                    required: true, 
                    message: 'Please input your Last Name.', 
                    whitespace: true }],
            })(<TextArea disabled= {addItemLoder}/>)}
            </FormItem>
        </Form>
        </Modal>
        );
    }
}

const AddItemCF = Form.create()(AddItem);

export default AddItemCF;