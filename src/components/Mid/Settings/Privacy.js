import React from 'react';
import {
  Button, 
  Card,
  // Checkbox, 
  Form, 
  Icon,
  Input,
  Spin,
  Switch,  
} from 'antd';
import {updatePrivacy} from '../../../store/actions';

const FormItem = Form.Item;
// const CheckboxGroup = Checkbox.Group;

class Privacy extends React.Component {
  state = {
    updateDisable: true,
  }
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    const {getFieldsValue} = this.props.form;
    const values = getFieldsValue()
    const {_id} = this.props.privacy;
    console.log (values)
    updatePrivacy({id:_id, ...values});
    this.setState({updateDisable: true});
  }

  handleChange(e){
    this.setState({updateDisable: false});
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    const {privacy} = this.props;
    const {displayname, email, address, contact} = privacy;

    return (
        <Card title="Privacy" bordered={false} style={{ width: '100%' }}>
        <Spin size="large" spinning={this.props.privacy.loader}>
        <Form style={{width:'100%'}}>
          <FormItem
            label={<b>Display Name</b>}
          >
            {getFieldDecorator('displayname', {
              rules: [{ required: false, message: 'Please input your contact number!' }],
              initialValue: displayname
            })(
              <Input onChange={this.handleChange} style={{ width: '100%' }} />
            )}
          </FormItem>

          <div style={{marginBottom:'30px'}}>
            <p><b>Details visible in found search:</b></p>
            {'Email: '}
            {getFieldDecorator('email', {initialValue: email})(
              <Switch onChange={this.handleChange} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={email} />
            )}
            {'  Contact '}
            {getFieldDecorator('contact', {initialValue: contact})(
              <Switch onChange={this.handleChange} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={contact} />
            )}
            {'  Address: '}
            {getFieldDecorator('address', {initialValue: address})(
              <Switch onChange={this.handleChange} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={address} />
            )}
          </div>
          <FormItem>
            <Button disabled={this.state.updateDisable} type="primary" onClick={this.handleSubmit}>Update</Button>
          </FormItem>
        </Form>
        </Spin>
      </Card>
    );
  }
}

const  PrivacyCF = Form.create()(Privacy);
export default PrivacyCF;