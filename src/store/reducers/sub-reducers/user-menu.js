import actions from '../../actions/action-const';

const defaultState = {
    home: {
        noPush: false,
        link:"home",
        icon:"home", 
        activeLink: false,
        callback: "",
        loading: false,
        toolTip:{
            placement: "top",
            title:"Home"
        }
    },
    notifications: {
        noPush: false,
        link:"notifications",
        icon:"notification", 
        activeLink: false,
        callback: "",
        loading: false,
        toolTip:{
            placement: "top",
            title:"Notification"
        }
    },
    manageitems: {
        noPush: false,
        link:"manageitems",
        icon:"qrcode", 
        activeLink: false,
        callback: "",
        loading: false,
        toolTip:{
            placement: "top",
            title:"Manage Items"
        }
    },
    settings: {
        noPush: false,
        link:"settings",
        icon:"setting", 
        activeLink: false,
        callback: "",
        loading: false,
        toolTip:{
            placement: "top",
            title:"Manage Items"
        }
    },
    signout: {
        noPush: true,
        link:"signout",
        icon:"logout", 
        activeLink: false,
        callback: "",
        loading: false,
        toolTip:{
            placement: "topRight",
            title:"Signout"
        }
    },
}

function UserMenu (state=defaultState, action) {
    switch (action.type) {
        case actions.USER_MENU_SELECT: { 
            return{...defaultState, ...action.payload}
        }
        case actions.SIGNOUT_PROCESS: {
            return {...state,
                signout:{...state.signout, loading: true} 
            }
        }
        case actions.SIGNOUT: {
            return {...state,
                signout:{...state.signout, loading: false} 
            }
        }
        default: {
            return {...state}
        }
    }
}

export default UserMenu;
