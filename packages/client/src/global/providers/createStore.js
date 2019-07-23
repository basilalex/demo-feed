import { createStore as createReduxStore, combineReducers, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export const createStore = reducers => {
  return createReduxStore(combineReducers(reducers), composeEnhancers());
};
