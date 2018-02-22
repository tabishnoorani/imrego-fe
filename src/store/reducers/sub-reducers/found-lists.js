import actions from '../../actions/action-const';
// import _ from 'lodash';

const defaultState = {
    catagories:[
        {
            optionName: "Status",
            value:"status"
        },
        {
            optionName: "Title",
            value:"title"
        },
        {
            optionName: "Desciption",
            value:"description"
        },
        {
            optionName: "Catagory",
            value:"catagory"
        },
        {
            optionName: "IM Number",
            value:"imNum"
        },
        {
            optionName: "Date Added On",
            value:"date"
        },
    ],
    fetching: false,
    FoundLists: [],
    sortBy: "",
    FoundItemInitialized: false,
};

function FoundLists (state = defaultState, action) {
    switch (action.type) {
        case actions.FOUND_LISTS_FETCHING: {
            return {...state, fetching: true}
        }
        case actions.FOUND_LISTS_FETCHED: {
            return {...state, fetching: false, FoundLists: action.payload}
        }

        default: {
            return {...state}
        }
    }
}

export default FoundLists;
