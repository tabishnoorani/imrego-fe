import actions from '../../actions/action-const';

const defaultState = {
    manageitems:{
        showAddItemModal: false,
        desAddItemModal: false,
        loder: {
            addItem: false
        }
    },
}

function Mid (state=defaultState, action) {
    switch (action.type) {
        case actions.SHOW_ADD_ITEM: {
            return {...state, manageitems:{...state.manageitems, showAddItemModal:true}}
        }
        case actions.SHOW_ADD_ITEM_CANCEL: {
            return {...state, 
                manageitems:{...state.manageitems, showAddItemModal:false}}
        }
        default: {
            return {...state }
        }
    }
}

export default Mid;
