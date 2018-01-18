import {combineReducers} from 'redux';
import User from './sub-reducers/user';
import Status from './sub-reducers/status';
import UserMenu from './sub-reducers/user-menu';

const Reducers = combineReducers({
    Status: Status,
    User: User,
    UserMenu: UserMenu
});

export default Reducers;