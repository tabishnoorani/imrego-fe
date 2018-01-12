import { applyMiddleware, createStore } from 'redux';
import Reducers from './reducers';
import logger from 'redux-logger';
// import promise from 'redux-promise-middleware';
// import thunk from 'redux-thunk';

const middleware = applyMiddleware(logger);

const store = createStore(Reducers,middleware);

export default store;
