import { applyMiddleware, createStore } from 'redux';
import Reducers from './reducers';
import logger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// import promise from 'redux-promise-middleware';
// import thunk from 'redux-thunk';

export const history = createHistory();

const middleware = applyMiddleware(logger, routerMiddleware(history));

const store = createStore(Reducers,middleware);

export default store;
