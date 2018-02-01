import React from 'react';
import {Form, Input, Upload, Button, Icon} from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import config from '../../../config';

const FormItem = Form.Item;
const {TextArea} = Input;

class Item extends React.Component {
    state = {
        fileList: [],
    }
    
    render(){
        const {loader, _id, ItemLists} = this.props;

        var keyValue = _.findIndex(ItemLists, function(item) { 
            return item._id === _id; 
        });
        
        const { getFieldDecorator } = this.props.form;
        
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

        return(
        <Form>
            <FormItem
            {...formItemLayout}
            label="Title">
            {getFieldDecorator('title', {
            initialValue:ItemLists[keyValue].title,
            rules: [{ 
            required: true, message: 'Please enter the title.', 
            whitespace: true }],
            })(<Input disabled= {loader} />)}
            </FormItem>
        
            <FormItem
            {...formItemLayout}
            label="Catagory">
            {getFieldDecorator('catagory', {
            initialValue:ItemLists[keyValue].catagory,
            rules: [{ 
            required: true, 
            message: 'Item Catagory.', 
            whitespace: true }],
            })(<Input disabled= {loader}/>)}
            </FormItem>
        
            <FormItem
            {...formItemLayout}
            label="Description">
            {getFieldDecorator('description', {
            initialValue:ItemLists[keyValue].description,
            rules: [{ 
            required: true, 
            message: 'Please input your Last Name.', 
            whitespace: true }],
            })(<TextArea disabled= {loader}/>)}
            </FormItem>
        
            <FormItem
            {...formItemLayout}
            label="Images of item">
            {getFieldDecorator('imgs')(
            <Upload {...imgProps}>
            <Button disabled= {loader}>
            <Icon type="upload" /> Click to Upload
            </Button>
            </Upload>)}
            </FormItem>
        </Form>
        );
    }
}

// const ItemCF = Form.create()(Item);

const returnStore = (store)=>{
    return({ItemLists: store.ItemLists.ItemLists})
}

export default connect(returnStore)(Item);
