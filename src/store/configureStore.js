import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import allReducers from '../Reducers';

const store = createStore(combineReducers({
  ...allReducers
}), applyMiddleware(thunk, createLogger()));

export default store;