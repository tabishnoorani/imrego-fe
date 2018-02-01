import React from 'react';
import {Modal, Spin, Form, Input, Upload, Button, Icon} from 'antd';
import {connect} from 'react-redux';
import config from '../../../../config';

const FormItem = Form.Item;
const {TextArea} = Input;

class EditItem extends React.Component {
  state = {
    fileList: [],
  }
  render() {
    
    function onCancel() {
    }

    function onOk() {
      this.setState({fileList: []});
    }

    const {visible, _id, showEditItemID, addItemLoder} = this.props;
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
      <Modal
      visible={(_id === showEditItemID)}
      title="Edit"
      okText="Upload"
      confirmLoading = {addItemLoder}
      onCancel= {onCancel}
      onOk = {onOk.bind(this)}
      destroyOnClose={true}
      >
        {this.props._id}
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
    )}
  }


  const returnState = (store)=>{
  return({
  showEditItemID: store.ItemLists.showEditItemID,
  });
}

const EditItemCF = Form.create()(EditItem)

export default connect(returnState)(EditItemCF);

