import actions from '../../actions/action-const';
import _ from 'lodash';

const defaultState = {
    catagories:[
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
    ItemLists: [],
    sortBy:"",
    showEditItemID: "",
};

var Index;

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
            Index = _.findIndex(ItemLists, function(item) { return item._id === action.payload; });
            ItemLists[Index].deleting = true;
            return {...state, ItemLists: ItemLists}
        }
        case actions.ITEM_LISTS_DELETED: {
            const ItemLists = [...state.ItemLists];
            ItemLists.splice(Index,1);
            Index = null;
            return {...state, ItemLists: ItemLists}
        }
        case actions.ITEM_LISTS_CATAGORY:{
            return {...state, sortBy: action.payload}
        }
        case actions.SHOW_EDIT_ITEM:{
            return {...state, showEditItemID: action.payload}
        }
        case actions.MODAL_FORM_SENT_DATA:{
            const ItemLists = [...state.ItemLists];
            Index=_.findIndex(ItemLists, function(item){ return item._id===action.payload._id;});
            ItemLists[Index] = action.payload;
            return {...state, ItemLists}
        }
        case actions.UPDATING_IMREGO_STATUS:{
            const ItemLists = [...state.ItemLists];
            Index = _.findIndex(ItemLists, function(item) { return item._id === action.payload; });
            ItemLists[Index].loadingLFB = true;
            return {...state, ItemLists: ItemLists}
        }
        case actions.UPDATED_IMREGO_STATUS:{
            const ItemLists = [...state.ItemLists];
            ItemLists[Index].loadingLFB = false;
            ItemLists[Index].status = action.payload;
            return {...state, ItemLists: ItemLists}
        }
        default: {
            return {...state}
        }
    }
}

export default ItemLists;
