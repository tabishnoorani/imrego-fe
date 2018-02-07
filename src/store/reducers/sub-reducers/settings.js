import actions from '../../actions/action-const';

const defaultState = {
    profile: {

    },
    privacy: {

    },
    Security:{

    }
}

function Settings (state=defaultState, action) {
    switch (action.type) {
        case actions.ITEM_LISTS_INITIALIZED:{
            return {...state}
        }
        default: {
            return {...state }
        }
    }
}

export default Settings;
