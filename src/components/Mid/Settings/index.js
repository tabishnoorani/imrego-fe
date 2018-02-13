import React from 'react';
import { Row, Col } from 'antd';
import {connect} from 'react-redux';
import Profile from './Profile'
import Privacy from './Privacy';
import Security from './Security';

class Settings extends React.Component {
  render(){
    const {settings, user} = this.props
    // console.log (user);

    return (
      <Row type="flex" justify="start" gutter={16} style={{width:'100%', margin:'0px 50px 15px 50px'}}>
        <Col span={12}>
          <Profile user={user} profile={settings.profile}/>
        </Col>
        <Col span={12}>
          <Privacy privacy={settings.privacy}/>
          <Security/>
        </Col>
      </Row>
    );
  }
}

const returnState = (store)=>{
  return({
    settings: store.Settings,
    user: store.User,
  })
}

export default connect(returnState)(Settings);