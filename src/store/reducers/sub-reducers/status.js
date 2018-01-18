import actions from '../../actions/action-const';

const defaultState = {
    auth: false,
    date: "",
    loders: { //Button Clicks
        signin: false,
        signup: false,
        signout: false,
        imregoSearch: false,
        createUser: false
    },
    msg:{
        signinField:""
    },
    showSignupModal: false,
    DesSignupModal: false,
    userMenuSelect: {
        notifications: false,
        manageItems: false,
        settings: false,
        signout: false
    }
}

function Status (state=defaultState, action) {
    switch (action.type) {
        case actions.SIGNIN_PROCESS : {
            return {...state, loders:{signin: true}}
        }
        case actions.SIGNIN_PROCESS_DONE:{
            return {...state, loders: {signin: false}}
        }
        case actions.SIGNIN:{
            return {...state, auth: true, loders: {signin: false}}
        }
        case actions.SIGNIN_FAILED:{
            return {...state, 
                loders: {signin: false}, 
                msg:{signinField: action.payload}
            }
        }
        case actions.SIGNOUT: {
            return {...state, auth: false, loders: {signout: false}, showSignupModal: false}
        }
        case actions.RESET_SIGNIN_FAILED: {
            return {...state, msg:{signinField:""}}
        }
        case actions.SIGNOUT_PROCESS: {
            return {...state, loders: {signout: true} }
        }
        case actions.SIGNUP: {
            return {...state, showSignupModal: true, DesSignupModal: false}
        }
        case actions.SIGNUP_CANCEL:{
            return {...state, showSignupModal: false}
        }
        case actions.SIGNUP_CREATE:{
            return {...state, loders: {createUser: true}}
        }
        case actions.SIGNUP_CREATED:{
            return {...state,
                Test:"Compeleted",
                DesSignupModal: true, 
                loders: {createUser: false}, 
                showSignupModal: false }
        }
        case actions.USER_MENU_SELECT: {
                    return{...state,
                        userMenuSelect: {...action.payload}
                    }
                }
        default: {
            return {...state }
        }
    }
}

export default Status;
