import actions from '../../actions/action-const';

const defaultState = {
    auth: false,
    date: "",
    loading: true,
    loders: { //Button Clicks
        signin: false,
        signup: false,
        imregoSearch: false,
        createUser: false
    },
    msg:{
        signinField:""
    },
    showSignupModal: false,
    DesSignupModal: false,
}

function Status (state=defaultState, action) {
    switch (action.type) {
        case actions.SIGNIN_PROCESS : {
            return {...state, loders:{signin: true}}
        }
        case actions.SIGNIN_PROCESS_DONE:{
            return {...state,  loading : false,
                loders: {signin: false}}
        }
        case actions.SIGNIN:{
            return {...state, auth: true, loading : false,
                loders: {signin: false}}
        }
        case actions.SIGNIN_FAILED:{
            return {...state, loading : false,
                loders: {signin: false}, 
                msg:{signinField: action.payload}
            }
        }
        case actions.SIGNOUT: {
            return {...state, 
                auth: false, 
                loders: {signout: false}, 
                showSignupModal: false, 
                loading: false
            }
        }
        case actions.RESET_SIGNIN_FAILED: {
            return {
                ...state, 
                msg:{...state.msg, signinField:""}
            }
        }
        case actions.SIGNOUT_PROCESS: {
            return {
                ...state, 
                loders: {...state.loders, signout: true} 
            }
        }
        case actions.SIGNUP: {
            return {
                ...state, 
                showSignupModal: true, 
                DesSignupModal: false
            }
        }
        case actions.SIGNUP_CANCEL:{
            return {
                ...state, 
                showSignupModal: false
            }
        }
        case actions.SIGNUP_CREATE:{
            return {
                ...state, 
                loders: {...state.loders, createUser: true}
            }
        }
        case actions.SIGNUP_CREATED:{
            return {
                ...state,
                Test:"Compeleted",
                DesSignupModal: true, 
                loders: {...state.loders, createUser: false}, 
                showSignupModal: false 
            }
        }
        case actions.SIGNUP_REFUSED:{
            return {
                ...state, 
                loders: {...state.loders, createUser: false}}
        }
        case actions.SEARCHING: {
            return {
                ...state,
                loders: {...state.loders, imregoSearch: true}
            }
        }
        case actions.SEARCH_COMPELETED: {
            return {
                ...state,
                loders: {...state.loders, imregoSearch: false}
            }
        }
        default: {
            return {...state }
        }
    }
}

export default Status;
