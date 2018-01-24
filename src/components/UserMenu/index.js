import React from 'react';
import {withRouter} from 'react-router-dom';
import { Row, Col } from 'antd';
import MenuLink from '../menuLink';
import {userMenuSelect, signout} from '../../store/actions';

class UserMenu extends React.Component {

    constructor(props){
        super(props);
        this.Signout = this.Signout.bind(this);
    }
    
    componentWillMount(){
        const link = this.props.location.pathname;
        const {userMenu} = this.props;
        var activeLink = link.slice(1);
        if (activeLink==="") {
            activeLink='home';
            this.props.history.push('/home');
        }   
        const activeMenu = userMenu[activeLink] ? userMenu[activeLink] : "";
        if (activeMenu!=="") { 
            userMenuSelect(
                this.props.dispatch,
                activeMenu
            );
        }
    }
    
    Signout(){
        signout(this.props.dispatch, this.props.token);
        this.props.history.push('/');
    }

    render(){
        const { userMenu, dispatch } = this.props;
        userMenu['signout'].callback = this.Signout.bind(this)
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