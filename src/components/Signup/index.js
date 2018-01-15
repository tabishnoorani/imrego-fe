import React, { Component } from 'react';
import { Button, Modal, Form } from 'antd';
import SignupForm from './SignupForm';


const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate } = props;
    return (
      <Modal
        visible={visible}
        title="Signup for a new account"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <SignupForm/>
      </Modal>
    );
  }
);

class CollectionsPage extends Component {
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    return (
      <div>
        <Button onClick={this.showModal}>SIGN UP</Button>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CollectionsPage;