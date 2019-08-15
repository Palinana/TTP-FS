import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import portfolio from './portfolio';
import transactions from './transactions';
import error from './error';
import success from './success'

const reducer = combineReducers({ user, portfolio, transactions, error, success });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './portfolio';
export * from './transactions';
export * from './error';
export * from './success';