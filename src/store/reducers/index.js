import {combineReducers} from 'redux';
import User from './sub-reducers/user';
import Status from './sub-reducers/status';
import UserMenu from './sub-reducers/user-menu';
import Mid from './sub-reducers/mid';

const Reducers = combineReducers({
    Status: Status,
    User: User,
    UserMenu: UserMenu,
    Mid: Mid
});

export default Reducers;