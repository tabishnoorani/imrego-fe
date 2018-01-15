import actions from '../../actions/action-const';

const defaultState = {
    auth: false,
    date: "",
    loders: { //Button Clicks
        signin: false,
        signup: false,
        imregoSearch: false
    },
    msg:{
        signinField:""
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
            return {...state, auth: false, loders: {signout: false}}
        }
        case actions.RESET_SIGNIN_FAILED: {
            return {...state, msg:{signinField:""}}
        }
        case actions.SIGNOUT_PROCESS: {
            return {...state, loders: {signout: true} }
        }
        default: {
            return {...state }
        }
    }
}

export default Status;
