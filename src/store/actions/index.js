import axios from 'axios';
import {message, Modal} from 'antd';
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
    
}

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
            // window.location.reload(true)
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

    Dispatch({
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
        if (res.data.success) {
            form.resetFields();

            // Token=res.data.token;
            // dispatch({
            //     type: actions.SIGNUP_CREATED,
            // });
            // localStorage.setItem('token', Token);
            // dispatch({
                //     type: actions.SIGNIN,
                //     payload:{...res.data.data, token: Token}
                // });
            const {data, token} = res.data;
            Token=token;
            localStorage.setItem('token', token);
            
            dispatch({
                type: actions.SIGNUP_CREATED,
            });
            dispatch({
                type: actions.SIGNIN,
                payload:{...data, token: token}
            });
            Push('/home');
            message.success('New user created. Please check your email and verify the account!', 10);
        } else {
            message.error(res.data.msg, 10)
            Dispatch({
                type: actions.SIGNUP_REFUSED
            })
        }
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
    multipart=true,
    url="", 
    data="", 
    cb=(res)=>{console.log(res)}
  } = CONFIG;

  axios({
    method: method,
    url: `${config.HOST_URL}${url}`,
    headers:{
        authorization: `Bearer ${Token}`,
        'Content-Type': (multipart) ? 'multipart/form-data' : 'application/json'
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
            Dispatch({
                type: actions.MODAL_FORM_SENT_DATA,
                payload: res.data.imrego
            })
        }
      })
}

export function updateImregoStatus (_id, status) {
    Dispatch({
        type: actions.UPDATING_IMREGO_STATUS,
        payload: _id
    });

    axios({
        method: 'POST',
        url: `${config.HOST_URL}/api/updateimregostatus`,
        headers:{
            authorization: `Bearer ${Token}`,
            'Content-Type': 'application/json'
        },
        data:{
            id: _id,
            status: status
        }
    })
    .then((res)=>{
        if (res.data.success){
            Dispatch({
                type: actions.UPDATED_IMREGO_STATUS,
                payload: status
            })           
        }
    }) 
}

export function updateProfile (formData) {
    Dispatch({
        type: actions.PROFILE_UPDATING,
    });
    AXIOS({
        method:'POST', 
        url:"/api/updateprofile", 
        data:formData, 
        cb:(res)=>{
            Dispatch({
                type: actions.PROFILE_UPDATED,
                payload: res.data.profile
            })
        }
    });
}

export function removeImg(id){
    Dispatch({
        type: actions.PROFILE_UPDATING,
    });
    AXIOS({
        method:'POST', 
        multipart: false,
        url:"/api/removeimg", 
        data: {id}, 
        cb:(res)=>{
            Dispatch({
                type: actions.PROFILE_UPDATED,
                payload: res.data.profile
            })
        }
    });
}

export function updatePrivacy(formData){
    Dispatch({
        type: actions.PRIVACY_UPDATING,
    });
    AXIOS({
        method:'POST', 
        url:"/api/updateprivacy", 
        multipart: false,
        data:formData, 
        cb:(res)=>{
            Dispatch({
                type: actions.PRIVACY_UPDATED,
                payload: res.data.profile
            })
        }
    });
}

export function updatePassword(password, newPassword){
    Dispatch({
        type: actions.PASSWORD_UPDATING,
    });
    AXIOS({
        method:'POST', 
        url:"/api/changepassword", 
        multipart: false,
        data:{
            password, 
            newPassword
        }, 
        cb:(res)=>{
            console.log(res.data);
            if (res.data.success){
                const successMsg = Modal.success({
                    title: 'Password updated',
                    content: 'Password updated. To login again you have to use new password',
                });
                setTimeout(()=>successMsg.destroy(), 3000);
            } else {
                switch (res.data.errCode){
                    case "dbErr":{
                        Modal.error({
                            title: 'Password updating failed. Error code: dbErr',
                            content: 'Try again if the issue presists, please contact web administrator.'
                        });
                        break
                    }
                    case "incPwd":{
                        Modal.error({
                            title: 'Incorrect Password.',
                            content: 'The password entered was incorrect. Please retype the password.',
                        });
                        break
                    }
                    case "unStdPwd":{
                        Modal.error({
                            title: 'Password not as per standard. Error code: unStdPwd',
                            content: 'Please check the password. It should be at least 8 characters long, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. You can use special characters',
                        });
                        break
                    }
                    default:{
                        message.error('Password updating failed');
                    }
                }
            }
            Dispatch({
                type: actions.PASSWORD_UPDATED,
            })
        }
    });
}

export function searchItem(imNum){
    if (imNum!=="" && imNum !==undefined){
        Dispatch({
            type: actions.SEARCHING,
        });
        AXIOS({
            method:'POST', 
            url:"/api/searchimrego", 
            multipart: false,
            data:{
                imNum
            }, 
            cb:(res)=>{
                console.log (res.data)

                Dispatch({
                    type: actions.SEARCH_COMPELETED,
                    payload: res.data
                })
            }
        });
    }
}

export function cancelDisplayItem(){
    Dispatch({
        type: actions.HIDE_DISPLAY_ITEM
    })
}

export function addFoundItem(_id){
    if (_id){
        Dispatch({
            type: actions.ADDING_DISPLAY_ITEM,
        });
        AXIOS({
            method:'POST',
            url:"/api/addfounditem", 
            multipart: false,
            data:{
                _id
            }, 
            cb:(res)=>{
                console.log(res.data)
                Dispatch({
                    type: actions.ADDED_DISPLAY_ITEM,
                    payload: res.data
                })
                if (res.data.errCode===undefined){
                    const successMsg = Modal.success({
                        title: 'IM# ADDED!',
                        content: 'The item has been added to you Found Items. To update it further please goto Manage Items->Found Items.',
                    });
                    setTimeout(()=>successMsg.destroy(), 3000);
                }
                if (res.data.errCode==='addfounditem-000'){
                    const warningMsg = Modal.warning({
                        title: 'IM# already added',
                        content: 'The item is already added to your Found Items. To update it further please goto Manage Items->Found Items.',
                    });
                    // setTimeout(()=>successMsg.destroy(), 3000);
                }
            }
        });
    }
} 
