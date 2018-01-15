import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import CollectionCreateForm from './SignupForm';
import { signup, signupCancel, signupCreate } from '../../store/actions';

class CollectionsPage extends Component {
  showModal = () => {
    signup(this.props.dispatch)
  }
  handleCancel = () => {
    signupCancel(this.props.dispatch)
  }
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      signupCreate(this.props.dispatch, values, this.form);
      // console.log('Received values of form: ', values);
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
          visible={this.props.showSignupModal}
          createUserLoder={this.props.createUser}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          DesSignupModal={this.props.DesSignupModal}
        />
      </div>
    );
  }
}

const returnState = (store)=>{
  return({
    showSignupModal: store.Status.showSignupModal,
    createUser: store.Status.loders.createUser,
    DesSignupModal: store.Status.DesSignupModal
  });
}
export default connect(returnState)(CollectionsPage);
