import React from 'react';
import {Modal, Spin, Form} from 'antd';
import {connect} from 'react-redux';
import {hideModalForm, modalFromSendData} from '../../../store/actions';

class ModalForm extends React.Component {
  state = {
    fileList: [],
  }

  render() {
    
    // const saveFormRef = (Form) => {
    //     this.form = Form;
    // }
    const {
        title = "Form",
        okText = "Ok",
        cancelText = "Cancel",
        _id="", 
        showModalForm, 
        loader, 
        childForm=""} = this.props;

    function onCancel() {
        hideModalForm()
    }

    function onOk() {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const file = (values.imgs!==undefined)?values.imgs.fileList[0]:""
          const formData = new FormData();
          formData.append('id',_id)
          formData.append('title', values.title);
          formData.append('catagory', values.catagory);
          formData.append('description', values.description);
          formData.append('file',file);
          modalFromSendData(formData)
          
        }
      })
    }

    return(
      <Modal
      title={title}
      okText={okText}
      cancelText={cancelText}
      visible={showModalForm}
      confirmLoading = {loader}
      onCancel= {onCancel}
      onOk = {onOk.bind(this)}
      destroyOnClose={true}
      >
        <Spin spinning={loader}>
            {childForm({
              loader:loader,
              _id: _id,
              form: this.props.form
              })
            }
        </Spin>
      </Modal>
    )}
  }


  const returnState = (store)=>{
  return({
    showModalForm: store.ModalForm.showModalForm,
    loader: store.ModalForm.loader,
    _id: store.ModalForm._id,
  });
}

const ModalFormCF = Form.create()(ModalForm)

export default connect(returnState)(ModalFormCF);

