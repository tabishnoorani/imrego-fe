import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import User from './sub-reducers/user';
import Status from './sub-reducers/status';
import UserMenu from './sub-reducers/user-menu';
import ItemLists from './sub-reducers/item-lists';
import Mid from './sub-reducers/mid';

const Reducers = combineReducers({
    Status: Status,
    User: User,
    UserMenu: UserMenu,
    Mid: Mid,
    ItemLists: ItemLists,
    router: routerReducer,
});

export default Reducers;