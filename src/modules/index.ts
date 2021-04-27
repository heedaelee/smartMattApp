/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {combineReducers, applyMiddleware, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';

const Reducers = combineReducers(modules);
const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(logger))
    : composeWithDevTools(applyMiddleware(logger));

export const store = createStore(Reducers, enhancer);
