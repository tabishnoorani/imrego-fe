import actions from './action-const';
import config from '../../config';
import axios from 'axios';

export function signin(dispatch, credential){
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
        } else dispatch({
            type: actions.SIGNIN_FAILED,
            payload:"Email and password does not match."
        })
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
