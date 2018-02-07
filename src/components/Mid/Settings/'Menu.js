import React from 'react';
import {Affix, Menu, Icon} from 'antd';
// import {connect} from 'react-redux';
import {Push} from '../../../store/actions';

const SettingMenu = (props)=>{

  function pushFunc ({key}){
    switch (key) {
      case '1':{
        Push(`/settings/profile`);
        break
      }
      case '2':{
        Push(`/settings/privacy`);
        break
      }
      case '3':{
        Push(`/settings/security`);
        break
      }
      default:
        break;
    }
  }

  return(
    <Affix offsetTop={70}>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        // theme="dark"
        inlineCollapsed={true}
        onClick={pushFunc}
      >
          <Menu.Item key="1">
              <Icon type="user" />
              <span>Profile</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="safety" />
              <span>Privacy</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="key" />
              <span>Security</span>
            </Menu.Item>
      </Menu>
    </Affix>
  )
}

// const returnState = (store)=>{
//   return({
//     pathname: store.router.location.pathname
//   });
// }

// export default connect(returnState)(SettingMenu);
export default SettingMenu;