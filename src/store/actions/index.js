import actions from './action-const';
import config from '../../config';
import axios from 'axios';

export function signin(dispatch, credential,aNotification){
    dispatch({
        type: actions.SIGNIN_PROCESS,
        payload: ""
    });

    axios.post(`${config.HOST_URL}/auth/signin`,{
        email: credential.email,
        password: credential.password
    })
    .then((res)=>{
        if (res.data.success) {
            dispatch({
                type: actions.SIGNIN,
                payload:{...res.data.data, token: res.data.token}
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
        console.log(res)
        if (res.data.success===true) {
            dispatch({
                type: actions.SIGNOUT,
            })
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
        console.log(res);
    })

}

export function userMenuSelect (dispatch, select) {
    const payload = {
        notifications: false,
        manageItems: false,
        settings: false,
        signout: false
    };
    payload[select] = true;

    console.log (payload);
    dispatch({
        type: actions.USER_MENU_SELECT,
        payload: payload
    })
}
