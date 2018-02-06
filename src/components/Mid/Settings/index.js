import React from 'react';
import NotAuth from '../NotAuth';
import config from '../../../config';
import { Col, Row } from 'antd';
// import SettingMenu from './Menu';
import Profile from './Profile';

const Settings = (props)=>{
  window.document.title=`${config.APP_NAME} - Settings`
  const {auth} = props;
  if (auth!==false){
    return (
      <Row type="flex" justify="start" style={{width:'100%', margin:'0px 25px'}}>
        <Profile/>
      </Row>
    )
  } else return (<NotAuth />)
}

export default Settings;