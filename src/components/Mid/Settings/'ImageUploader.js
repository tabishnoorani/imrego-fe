import React from 'react';
import { Upload, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import config from '../../../config';

class ImageUploader extends React.Component {
  render() {
    const token = this.props;

    const uploadProps = {
      name: 'file',
      action: `${config.HOST_URL}/api/imgupload`,
      headers:{
        authorization: `Bearer ${token}`
      },
      
    }
    return (
        <Upload {...uploadProps}>
            <Button>
                <Icon type="upload" /> Upload
            </Button>
        </Upload>
    );
  }
}

export default connect((state)=>{return ({token:state.Status.token})})(ImageUploader);