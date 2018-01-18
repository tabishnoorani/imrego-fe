import React from 'react';
import {withRouter} from 'react-router-dom';
import { Row, Col } from 'antd';
import MenuLink from '../menuLink';
import {userMenuSelect} from '../../store/actions';

class UserMenu extends React.Component {

    componentDidMount(){
        const link = this.props.location.pathname;
        const {userMenu} = this.props;
        const activeLink = link.slice(1);
        const activeMenu = userMenu[activeLink] ? userMenu[activeLink] : "";
        if (activeLink!=="" && activeMenu!=="") {
          userMenuSelect(
            this.props.dispatch,
            activeMenu
          );
        }
      }

    render(){
        const { userMenu, dispatch } = this.props;
        return(
            <Row gutter={8} type="flex" justify="center" align="middle">
            {
                Object.keys(userMenu).map((key, index)=>{
                    return (
                        <Col key={`userMenu ${key}`}>
                            <MenuLink 
                            {...userMenu[key]} 
                            dispatch={dispatch}/>
                        </Col>
                    )
                })
            }
            </Row>
        )
    }
}

export default withRouter(UserMenu);