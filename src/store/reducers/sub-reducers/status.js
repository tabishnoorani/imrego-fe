const defaultState = {
    auth: false,
    date: "",
    loders: {
        signin: false,
        signup: false,
        imregoSearch: false
    }
}

function Status (state=defaultState, action) {
    const newState = {...state};
    return newState;
}

export default Status;
