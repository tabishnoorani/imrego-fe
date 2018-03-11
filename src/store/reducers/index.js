import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import User from './sub-reducers/user';
import Status from './sub-reducers/status';
import UserMenu from './sub-reducers/user-menu';
import ItemLists from './sub-reducers/item-lists';
import Mid from './sub-reducers/mid';
import ModalForm from './sub-reducers/modal-form';
import Settings from './sub-reducers/settings';
import SearchBar from './sub-reducers/search-bar';
import FoundLists from './sub-reducers/found-lists';
import Notification from './sub-reducers/notification';

const Reducers = combineReducers({
    Status: Status,
    User: User,
    UserMenu: UserMenu,
    Mid: Mid,
    ItemLists: ItemLists,
    router: routerReducer,
    ModalForm: ModalForm,
    Settings: Settings,
    SearchBar: SearchBar,
    FoundLists: FoundLists,
    Notification: Notification,
});

export default Reducers;