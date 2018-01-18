import actions from '../../actions/action-const';

const defaultState = {
    home: {
        noPush: false,
        link:"home",
        icon:"home", 
        activeLink: false,
        callback: "",
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
        default: {
            return {...state }
        }
    }
}

export default UserMenu;
