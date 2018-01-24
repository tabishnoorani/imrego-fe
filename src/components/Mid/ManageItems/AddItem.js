import React, { Component } from 'react';
import { Form, Input, Modal, Upload, Button, Icon, Spin } from 'antd';
import config from '../../../config';

const FormItem = Form.Item;
const {TextArea} = Input;


class AddItem extends Component {
  state = {
    fileList: [],
  }
  
  render() {
    const { 
      visible, 
      onCancel, 
      onCreate, 
      addItemLoder, 
      desAddItemModal=true,
      } = this.props;
    
    const imgProps = {
      action: `${config.HOST_URL}/api/imgupload`,

      onRemove: (file) => {
        this.setState({
          fileList: [],
        });
      },
      
      beforeUpload: (file) => {
        this.setState({fileList:[file]})
        return false;
      },

      fileList: this.state.fileList,
    };

    const { getFieldDecorator } = this.props.form;
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

    function onCreateI () {
      this.setState({fileList: []});
      onCreate();
    }

    return (
      <Modal 
      visible={visible}
      title="Add an Item"
      okText="Add"
      confirmLoading = {addItemLoder}
      onCancel= {onCancel}
      onOk = {onCreateI.bind(this)}
      destroyOnClose={desAddItemModal}>

      <Spin spinning={addItemLoder}>
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
          <FormItem
          {...formItemLayout}
          label="Images of item">
          {getFieldDecorator('imgs')(
          <Upload {...imgProps}>
              <Button>
              <Icon type="upload" /> Click to Upload
              </Button>
          </Upload>)}
          </FormItem>
      </Form>
      </Spin>
      </Modal>
    );
  }
}

const AddItemCF = Form.create()(AddItem);

export default AddItemCF;