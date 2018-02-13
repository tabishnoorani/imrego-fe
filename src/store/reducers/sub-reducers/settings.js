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
        visiblecontacts: ["Email"],
        loader: false,
    },
    security:{
        loader: false
    }
}

function Settings (state=defaultState, action) {
    switch (action.type) {
        case actions.SIGNIN: {
            const {privacy, profile} = action.payload;
            return {...state,
                profile:{...state.profile, ...profile},
                privacy: {...state.privacy, ...privacy},
            }
        }
        case actions.PROFILE_UPDATING: {
            return {...state,
                profile: {...state.profile, loader: true}
            }
        }
        case actions.PROFILE_UPDATED:{
            return {...state,
                profile: {
                    ...state.profile, 
                    ...action.payload,
                    loader: false
                }
            }
        }
        case actions.PRIVACY_UPDATING:{
            return {...state,
                privacy: {...state.privacy, loader: true}
            }
        }
        case actions.PRIVACY_UPDATED:{
            return {...state,
                privacy: {
                    ...state.privacy, 
                    ...action.payload,
                    loader: false
                }
            }
        }
        case actions.SIGNOUT: {
            return {...defaultState}
        }
        default: {
            return {...state }
        }
    }
}

export default Settings;
