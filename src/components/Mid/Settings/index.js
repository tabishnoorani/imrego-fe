import React from 'react';
import { Row, Col } from 'antd';
import Profile from './Profile'
import Privacy from './Privacy';
import Security from './Security';




class Settings extends React.Component {
  render(){
    return (
      <Row type="flex" justify="start" gutter={16} style={{width:'100%', margin:'0px 50px 15px 50px'}}>
        <Col span={12}>
          <Profile/>
        </Col>
        <Col span={12}>
          <Privacy/>
          <Security/>
        </Col>
      </Row>
    );
  }
}

export default Settings;