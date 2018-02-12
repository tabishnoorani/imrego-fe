import actions from '../../actions/action-const';

const defaultState = {
    profile: {
        _id:"",
        verified: false,
        modifiedDate: '', 
        dob: Date.now(),
        gender: "",
        address: "",
        contact: "",
        profilePicture: "",
        loader: false,
    },
    privacy: {
        _id:"",
        displayname: "",
        visiblecontacts: ["email"],
        visibleitem: false
    },
}

function Settings (state=defaultState, action) {
    switch (action.type) {
        case actions.SIGNIN: {
            const {privacy, profile} = action.payload;
            console.log({privacy,profile});
            return {...state,
                profile:{...state.profile, ...profile},
                privacy: {...state.privacy, ...privacy},
            }
        }
        default: {
            return {...state }
        }
    }
}

export default Settings;
