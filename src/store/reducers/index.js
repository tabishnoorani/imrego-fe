import {combineReducers} from 'redux';
import User from './sub-reducers/user';
import Status from './sub-reducers/status';

const Reducers = combineReducers({
    Status: Status,
    User: User
});

export default Reducers;