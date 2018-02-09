import actions from '../../actions/action-const';

const defaultState = {
    profile: {
        modifiedDate: '2018-02-01T00:00:00.000Z', 
        dob: '1985-12-18T00:00:00.000Z',
        gender: "m",
        address: "U22 11 Penny St Algester 4115",
        contact: "0401112637",
        profilePicture: "http://media.comicbook.com/2018/02/deadpool-2-characters-1080842.jpeg",
        loader: false,
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
