import actions from '../../actions/action-const';

const defaultState = {
    fname: "",
    lname: "",
    email: "",
    token: "",
    creationDate: "",
}
function User (state=defaultState, action) {
    switch (action.type){
        case actions.SIGNIN:
        {
            const {fname, lname, email, creationDate, token} = action.payload
            return ({...state,
                fname,
                lname,
                email,
                token,
                creationDate,
            });
        }
        case actions.SIGNOUT:{
            return ({...defaultState})
        }
        default:{
            return({...state});
        }
    }
}

export default User;