import actions from '../../actions/action-const';

const defaultState = {
    manageitems:{
        initialized: false,
        showAddItemModal: false,
        desAddItemModal: false,
        loder: {
            addItem: false
        }
    },
}

function Mid (state=defaultState, action) {
    switch (action.type) {
        case actions.ITEM_LISTS_INITIALIZED:{
            return {...state, 
                manageitems:{...state.manageitems, initialized:true}
            }
        }
        case actions.SHOW_ADD_ITEM: {
            return {...state, 
                manageitems:{...state.manageitems, showAddItemModal:true}
            }
        }
        case actions.SHOW_ADD_ITEM_CANCEL: {
            return {...state, 
                manageitems:{...state.manageitems, showAddItemModal:false}
            }
        }
        case actions.ADD_ITEM_CREATE: {
            return {...state, 
                manageitems:{...state.manageitems, 
                    loder:{...state.manageitems.loder, 
                        addItem: true
                    }
                }
            }
        }
        case actions.ADD_ITEM_CREATED:{
            return {...state,
                manageitems:{...state.manageitems, showAddItemModal: false,
                    loder: {...state.manageitems.loder,
                        addItem: false
                    }
                }
            }
        }
        case actions.SIGNOUT: {
            return {...defaultState}
        }
        default: {
            return {...state }
        }
    }
}

export default Mid;
