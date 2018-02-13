import React from 'react';
import {
  Card,
  Form, 
  Input,  
  Checkbox, 
  Button } from 'antd';
import {updatePrivacy} from '../../../store/actions';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class Privacy extends React.Component {
  state = {
    updateDisable: true,
  }
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => 
    {
      if (!err) {
        const {_id} = this.props.privacy;
        const formData = new FormData();
        // formData.append('id', _id);
        // formData.append('displayname', values.displayname);
        // formData.append('visiblecontacts', values.visiblecontacts);
        updatePrivacy({id:_id, ...values});
        this.setState({updateDisable: true});
      }
    });
  }

  handleChange(e){
    this.setState({updateDisable: false});
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    const {privacy} = this.props;
    const {displayname, visiblecontacts} = privacy;
    console.log (visiblecontacts);

    return (
        <Card title="Privacy" bordered={false} style={{ width: '100%' }}>
        <Form onSubmit={this.handleSubmit} style={{width:'100%'}}>
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

          <FormItem
            label={<b>Visible contact details to public</b>}
          >
            {getFieldDecorator('visiblecontacts', {
                initialValue: visiblecontacts
            })(
              <CheckboxGroup onChange={this.handleChange} options={['Email', 'Contact Number', 'Address']} />
            )}
          </FormItem>
          <FormItem>
            <Button disabled={this.state.updateDisable} type="primary" htmlType="submit">Update</Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

const  PrivacyCF = Form.create()(Privacy);
export default PrivacyCF;