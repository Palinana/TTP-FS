import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import portfolio from './portfolio';
import transactions from './transactions';
import message from './message'

const reducer = combineReducers({ user, portfolio, transactions, message });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './portfolio';
export * from './transactions';
export * from './message';