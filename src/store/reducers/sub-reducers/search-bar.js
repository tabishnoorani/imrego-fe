import actions from '../../actions/action-const';

const defaultState = {
    displayItemLoading: false,
    searchLoader: false,
    visible: false,
    item: undefined,
};

function SearchBar (state=defaultState, action) {
    switch (action.type) {
        case actions.SEARCHING: {
            return{...state, searchLoader: true}
        }
        case actions.SEARCH_COMPELETED: {
            return{...state, searchLoader: false, visible: true, item:action.payload}
        }
        case actions.HIDE_DISPLAY_ITEM: {
            return{...defaultState}
        }
        case actions.ADDING_DISPLAY_ITEM:{
            return{...state, displayItemLoading: true}
        }
        case actions.ADDED_DISPLAY_ITEM:{
            return{...defaultState}
        }
        default: {
            return {...state}
        }
    }
}

export default SearchBar;