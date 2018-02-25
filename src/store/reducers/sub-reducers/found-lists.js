import actions from '../../actions/action-const';
import _ from 'lodash';

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
    // loading: false,
};

function FoundLists (state = defaultState, action) {
    switch (action.type) {
        case actions.FOUND_LISTS_FETCHING: {
            return {...state, fetching: true}
        }
        case actions.FOUND_LISTS_FETCHED: {
            return {...state, fetching: false, FoundLists: action.payload, FoundItemInitialized: true}
        }
        case actions.FOUND_LISTS_STATUS_UPDATING: {
            const index=_.findIndex(state.FoundLists, {_id: action.payload})
            const newState = {...state, fetching:true}
            newState.FoundLists[index].status= [...newState.FoundLists[index].status, 'Loading']
            return { ...newState }
        }
        case actions.FOUND_LISTS_STATUS_UPDATED: {
            const {_id, status} = action.payload
            const index=_.findIndex(state.FoundLists, {_id})
            // var newState = {...state}
            // console.log (newState)
            switch (status) {
                case 'Deleted':
                {
                    const newState = {...state}
                    newState.FoundLists.splice(index, 1)
                    return ({...newState, fetching: false});                    
                }
                default:
                {    const newState = {...state, fetching :false}
                    newState.FoundLists[index].status= [...newState.FoundLists[index].status, status]
                    return { ...newState }
                }
            }
        }

        case actions.FOUND_LISTS_ADD_ITEM: {
            const newState = {...state, FoundLists: [...state.FoundLists, action.payload] }
            return (newState);
        }

        default: {
            return {...state}
        }
    }
}

export default FoundLists;
