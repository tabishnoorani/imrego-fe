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
        var activeLink = link.slice(1);
        if (activeLink==="") {
            activeLink='home';
            this.props.history.push('/home');
        }   
            userMenuSelect(
                this.props.dispatch,
                activeLink
            );
    }
    
    Signout(){ 
        signout(this.props.dispatch, this.props.token);
        this.props.history.push('/');
    }

    render(){
        const { userMenu, dispatch, pathname } = this.props;
        userMenu['signout'].callback = this.Signout.bind(this)
        return(
            <Row gutter={8} type="flex" justify="center" align="middle">
            {
                Object.keys(userMenu).map((key, index)=>{
                    return (
                        <Col key={`userMenu ${key}`}>
                            <MenuLink 
                            {...userMenu[key]} 
                            dispatch={dispatch}
                            pathname={pathname}/>
                        </Col>
                    )
                })
            }
            </Row>
        )
    }
}

export default withRouter(UserMenu);