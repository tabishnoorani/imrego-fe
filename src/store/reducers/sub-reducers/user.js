import actions from '../../actions/action-const';

const defaultState = {
    fname: "Tabbish",
    lname: "Noorani",
    email: "",
    verified: false, // add the function in the database at server side.
    token: "",
}
function User (state=defaultState, action) {
    switch (action.type){
        case actions.SIGNIN:
        {
            const {fname, lname, email, token} = action.payload
            return ({...state,
                fname,
                lname,
                email,
                token
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