import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import allReducers from './reducers';

const store = createStore(
  combineReducers({
    ...allReducers,
  }),
  applyMiddleware(...[thunk, ...(process.env.NODE_ENV === 'production' ? [] : [createLogger()])]),
);

export default store;
