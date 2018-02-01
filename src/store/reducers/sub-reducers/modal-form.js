import actions from '../../actions/action-const';

const defaultState = {
    showModalForm: false,
    loader: false,
    _id: ""
};

function ModalForm (state=defaultState, action) {
    switch (action.type) {
        case actions.SHOW_MODAL_FORM:{
            return{...state, showModalForm: true, _id: action.payload}
        }
        case actions.HIDE_MODAL_FORM:{
            return{...state, showModalForm: false}
        }
        case actions.MODAL_FORM_SENDING_DATA:{
            return{...state, loader: true}
        }
        case actions.MODAL_FORM_SENT_DATA:{
            return{...state, loader: false, showModalForm: false}
        }

        default: {
            return {...state}
        }
    }
}

export default ModalForm;
