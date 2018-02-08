import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import socket from './socket';

import { stocks } from './reducers';


export default createStore(
  combineReducers({
    stocks,
  }),
  {
    stocks : [],
  },
  applyMiddleware(thunk.withExtraArgument(socket), logger)
);