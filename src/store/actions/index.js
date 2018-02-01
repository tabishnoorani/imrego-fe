import axios from 'axios';
import {message} from 'antd';
import {push} from 'react-router-redux';
import actions from './action-const';
import config from '../../config';

var Dispatch = "";
var Token="";

export function initializeToken (dispatch, token) {
    Dispatch=dispatch;
    Token=token;
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
    Dispatch=dispatch;
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
            Token=token;
            localStorage.setItem('token', token);
            dispatch({
                type: actions.SIGNIN,
                payload:{...data, token: token}
            });
            Push('/home');
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
    Dispatch=dispatch;

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
        Token=res.data.token;
        dispatch({
            type: actions.SIGNUP_CREATED,
        });
        dispatch({
            type: actions.SIGNIN,
            payload:{...res.data.data, token: res.data.token}
        });
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
    console.log(values)
    dispatch({
        type: actions.ADD_ITEM_CREATE
    });
    const formData = new FormData()
    
    for (var key in values) {
        formData.append(key, values[key]);
    }
    const imgFile = (values.imgs!==undefined) ?
                    values.imgs.fileList[0] :
                    null;
    
    formData.append('file',imgFile)
    
    axios({
        method: 'POST',
        url: `${config.HOST_URL}/api/imrego`,
        headers:{
            authorization: `Bearer ${token}`,
            // 'Content-Type': 'application/json'
        },
        json: true,
        data: formData 
    }).then((res)=>{
        console.log(res.data);
        message.success('Item added!')
        dispatch({
            type: actions.ADD_ITEM_CREATED,
            payload: {...res.data.imrego._doc, deleting: false}
        })          
    })
}

export function delItem (id){
    Dispatch({
        type: actions.ITEM_LISTS_DELETING,
        payload: id,
    });
    axios({
        method: 'POST',
        url: `${config.HOST_URL}/api/delete-item-list`,
        headers:{
            authorization: `Bearer ${Token}`,
            'Content-Type': 'application/json'
        },
        data:{
            id: id
        }
    })
    .then((res)=>{
        if (res.data.success){
            message.success('Item deleted!')
            Dispatch({
                type: actions.ITEM_LISTS_DELETED,
                payload:id
            })            
        }
    })   
}

export function itemListsInitilized(){
    Dispatch({
        type: actions.ITEM_LISTS_INITIALIZED
    });
    fetchItemLists('Item list initialized!');
}

export function fetchItemLists (msg){
    Dispatch({
        type: actions.ITEM_LISTS_FETCH
    })
    axios({
        method: 'POST',
        url: `${config.HOST_URL}/api/fetch-item-lists`,
        headers:{
            authorization: `Bearer ${Token}`,
            'Content-Type': 'application/json'
        }
    })
    .then((res)=>{
        // console.log(res.data);
        if (res.data.success){
            message.success(msg)
            Dispatch({
                type: actions.ITEM_LISTS_FETCHED,
                payload:res.data.itemLists
            })            
        }
    })   
}

export function currentCatagory (catagory){
    Dispatch({
        type: actions.ITEM_LISTS_CATAGORY,
        payload: catagory
    })
} 

export function AXIOS (CONFIG){
  const {
    method='POST', 
    url="", 
    data="", 
    cb=(res)=>{console.log(res)}
  } = CONFIG;

  axios({
    method: method,
    url: `${config.HOST_URL}${url}`,
    headers:{
        authorization: `Bearer ${Token}`,
        'Content-Type': 'multipart/form-data'
        // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    json: true,
    data: data,
  }).then((res)=>{
    cb(res);
  });
}

export function showModalForm(_id=""){
    Dispatch({
        type: actions.SHOW_MODAL_FORM,
        payload: _id,
    })
}

export function hideModalForm(){
    Dispatch({
        type: actions.HIDE_MODAL_FORM,
    })
}

export function modalFromSendData (formData){
    Dispatch({
        type: actions.MODAL_FORM_SENDING_DATA
    });
    AXIOS({
        method:'POST', 
        url:"/api/updateimrego", 
        data:formData, 
        cb:(res)=>{
            console.log(res);
            Dispatch({
                type: actions.MODAL_FORM_SENT_DATA,
                payload: res.data.imrego
            })
        }
      })
}
