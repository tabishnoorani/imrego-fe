import actions from '../../actions/action-const';

const defaultState = {
    rollback: {
        link:"rollback",
        icon:"rollback", 
        activeLink: false,
        toolTip:{
            placement: "top",
            title:"Roll Back"
        }
    },
    notifications: {
        link:"notifications",
        icon:"notification", 
        activeLink: false,
        toolTip:{
            placement: "top",
            title:"Notification"
        }
    },
    manageitems: {
        link:"manageitems",
        icon:"qrcode", 
        activeLink: false,
        toolTip:{
            placement: "top",
            title:"Manage Items"
        }
    },
    settings: {
        link:"settings",
        icon:"setting", 
        activeLink: false,
        toolTip:{
            placement: "top",
            title:"Manage Items"
        }
    },
    signout: {
        link:"signout",
        icon:"logout", 
        activeLink: false,
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
