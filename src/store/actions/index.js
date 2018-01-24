import axios from 'axios';
import {message} from 'antd';
import {push} from 'react-router-redux';
import actions from './action-const';
import config from '../../config';

var Dispatch = "";

export function initializeToken (dispatch, token) {
    Dispatch=dispatch;
    window.document.title=config.APP_NAME;
    if (token){
    axios.get(`${config.HOST_URL}/auth/initializeToken`,{
        headers:{
            authorization: `Bearer ${token}`
        }
    })
    .then((res)=>{
        if (res.data.success){
            dispatch({
                type: actions.SIGNIN,
                payload:{...res.data.data, token: token, loading: false}
            })
        }else {
            localStorage.removeItem('token');
            dispatch({
                type: actions.SIGNIN_FAILED,
                payload:"Invalid or expired token. Please signin again."
            });
        }
    })
    .catch((err)=>{
        localStorage.removeItem('token');
        dispatch({
            type: actions.SIGNIN_FAILED,
            payload: "Error in signing in. Please contact the webmaster."
        });
    });
    } else {
        dispatch({
            type: actions.SIGNOUT 
        })
    }
}

export function Push (pushTo){
    Dispatch(push(pushTo));
}

export function signin(dispatch, credential, aNotification){
    dispatch({
        type: actions.SIGNIN_PROCESS,
    });

    axios.post(`${config.HOST_URL}/auth/signin`,{
        email: credential.email,
        password: credential.password
    })
    .then((res)=>{
        if (res.data.success) {
            const {data, token} = res.data;
            localStorage.setItem('token', token);
            dispatch({
                type: actions.SIGNIN,
                payload:{...data, token: token}
            });

        } else {
            dispatch({
                type: actions.SIGNIN_FAILED,
                payload:"Email and password does not match."
            });
            aNotification();
        }
    })
    .catch((err)=>{
        dispatch({
            type: actions.SIGNIN_FAILED,
            payload: "Error in signing in. Please contact the webmaster."
        });
    });
    
};

export function signout(dispatch, token){
    dispatch({
        type: actions.SIGNOUT_PROCESS,
    });
    axios.get(`${config.HOST_URL}/auth/signout`, {
        headers:{
            authorization: `Bearer ${token}`
        }
    }).then((res)=>{
        if (res.data.success===true) {
            localStorage.clear();
            dispatch({
                type: actions.SIGNOUT,
            });
            Push('/');
        }
    })
}


export function resetSigninNotification(dispatch) {
    dispatch({
        type: actions.RESET_SIGNIN_FAILED,
    });
}

export function signup (dispatch) {
    dispatch({
        type: actions.SIGNUP
    })
}

export function signupCancel (dispatch) {
    dispatch({
        type: actions.SIGNUP_CANCEL
    })
}

export function signupCreate (dispatch, user, form) {
    // form.resetFields();
    dispatch({
        type: actions.SIGNUP_CREATE
    });
    axios.post(`${config.HOST_URL}/auth/signup`, {
        "user" : {
            "fname" : user.fname,
            "lname" : user.lname,
            "email" : user.email,
            "password" : user.password
        }
    })
    .then((res)=>{
        form.resetFields();
        dispatch({
            type: actions.SIGNUP_CREATED,
        });
        dispatch({
            type: actions.SIGNIN,
            payload:{...res.data.data, token: res.data.token}
        });
    })
}

export function userMenuSelect (dispatch, props) {
    // var payload={};
    const link = props
    // payload[link] = {...props, activeLink: true}
    const payload=link;

    dispatch({
        type: actions.USER_MENU_SELECT, 
        payload: payload
    })
}



export function showAddItem (dispatch) {
    dispatch({
        type: actions.SHOW_ADD_ITEM
    })
}

export function showAddItemCancel(dispatch){
    dispatch({
        type: actions.SHOW_ADD_ITEM_CANCEL
    })
}

export function addItem (dispatch, values, token){
    // console.log(values)
    dispatch({
        type: actions.ADD_ITEM_CREATE
    });

    axios({
        method: 'POST',
        url: `${config.HOST_URL}/api/imgupload`,
        headers:{
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true,
        data: {
            file: values.imgs.fileList[0]
        }
    }).then((res)=>{
        axios({
            method: 'POST',
            url: `${config.HOST_URL}/api/imrego`,
            headers:{
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            json: true,
            data: {
                title: values.title,
                catagory: values.catagory,
                description: values.description,
                imgURL: res.data.url
            }
        }).then((res)=>{
            console.log(res.data);
            message.success('Item added!')
            dispatch({
                type: actions.ADD_ITEM_CREATED
            })            
        })
        
    })
}
