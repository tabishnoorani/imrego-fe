import actions from '../../actions/action-const';

const defaultState = {
    fetching: false,
    ItemLists: [],
};

function ItemLists (state=defaultState, action) {
    switch (action.type) {
        case actions.ITEM_LISTS_FETCHED: {
            return {...state, ItemLists:[...action.payload]}
        }
        default: {
            return {...state}
        }
    }
}

export default ItemLists;
