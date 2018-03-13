import actions from '../../actions/action-const';

const defaultState = {
    notification:[],
    notificationArray:[],
    unseen:0,
    loading: false,
    next: null,
};

function Notification (state=defaultState, action) {
    switch (action.type) {
        case actions.SIGNIN: {
            const { notification, profile } = action.payload;
            const { lastseen } = profile
            // console.log(lastseen)
            var unseen = notification.length - lastseen;
            return {...state, notification, unseen}
        }
        case actions.NOTIFICATION_LOADING: {
            return {...state, loading: true}
        }
        case actions.NOTIFICATION_LOADED: {
            return {
                ...state, 
                loading: false, 
                unseen: 0, 
                notificationArray: action.payload.data, 
                next: action.payload.next
            }
        }
        case actions.NOTIFICATION_LOADED_MORE: {
            return {
                ...state, 
                loading: false, 
                notificationArray: [...state.notificationArray, ...action.payload.data], 
                next: action.payload.next
            }
        }
        default: {
            return {...state}
        }
    }
}

export default Notification;
