const defaultState = {
    fname: "",
    lname: "",
    email: "",
    verified: false,
    token: "",
}
function User (state=defaultState,action) {
    const newState = {...state};
    return newState;
}

export default User;