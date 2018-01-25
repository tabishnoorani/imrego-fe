import actions from '../../actions/action-const';

const defaultState = {
    fetching: false,
    ItemLists: [],
};

function ItemLists (state=defaultState, action) {
    switch (action.type) {
        case actions.ADD_ITEM_CREATED:{
            var ItemLists=[...state.ItemLists]
            ItemLists.push(action.payload);
            // console.log(actions.payload);
            return {...state, ItemLists};
        }
        case actions.ITEM_LISTS_FETCH: {
            return{...state, fetching: true }
        }
        case actions.ITEM_LISTS_FETCHED: {
            return {...state, fetching: false, ItemLists:[...action.payload]}
        }
        case actions.ITEM_LISTS_DELETING:{
            const ItemLists = [...state.ItemLists];
            ItemLists[action.payload].deleting=true;
            return {...state, ItemLists: ItemLists}
        }
        case actions.ITEM_LISTS_DELETED: {
            const ItemLists = [...state.ItemLists];
            ItemLists.splice(action.payload,1);
            return {...state, ItemLists: ItemLists}
        }
        default: {
            return {...state}
        }
    }
}

export default ItemLists;
