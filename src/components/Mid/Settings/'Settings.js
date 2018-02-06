import React from 'react';
import { Upload, Form, Input, Icon, Button } from 'antd';
import {AXIOS} from '../../../store/actions' 
const FormItem = Form.Item;

class ImageForm extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  }
  
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        function cb(res){
          console.log (res);
        }
        const { fileList } = this.state;
        const formData = new FormData();
        formData.append('file', fileList[0]);
        formData.append('title', values.title);
        formData.append('catagory', values.catagory);
        formData.append('description', values.description);

    
        this.setState({
          uploading: true,
        });
        
        AXIOS({
          method:'POST', 
          // url:'/api/imgupload', 
          url:'/api/imrego', 
          data: formData, 
          cb: cb});
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // const { uploading } = this.state;
    
    const uploadProps = {
      action: 'http://localhost:4000/api/imgupload',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    return (
        <div>
          {/* title, catagory, description */}
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="E-mail"
        >
          {getFieldDecorator('title', {
            rules: [
            // {
            //   type: 'email', message: 'The input is not valid E-mail!',
            // },
            {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label='Nick Name'
        >
          {getFieldDecorator('catagory', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label='Nick Name'
        >
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('file', {
            rules: [{ required: false}],
          })(
            <Upload {...uploadProps}>
              <Button>
                  <Icon type="upload" /> Upload
              </Button>
            </Upload>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const ImageFormCF = Form.create()(ImageForm);

export default ImageFormCF;