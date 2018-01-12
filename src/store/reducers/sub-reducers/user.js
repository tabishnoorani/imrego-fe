
const defaultState = {
    fname: "Tabbish",
    lname: "Noorani",
    email: "",
    verified: false, // add the function in the database at server side.
    token: "",
}
function User (state=defaultState, action) {
    switch (action.type){
        case "SIGNIN":
        {
            const {fname, lname, email, token} = action.payload
            return ({...state,
                fname,
                lname,
                email,
                token
            });
        }
        default:{
            return({...state});
        }
    }
}

export default User;