/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  combineReducers,
  applyMiddleware,
  compose,
  // createStore,
} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import {configureStore} from '@reduxjs/toolkit';
import userReducer, {UserState} from '~/modules/user/user';

//기존
// const Reducers = combineReducers({userReducer});
// const enhancer =
//   process.env.NODE_ENV === 'production'
//     ? compose(applyMiddleware(logger))
//     : composeWithDevTools(applyMiddleware(logger));

//이 형태 참조: velog-client-master
export type RootState = {
  user: UserState;

  /* ex)
  header: HeaderState;
  post: PostState;
  error: ErrorState;
  scroll: ScrollState; */
};

//기존
// export const store = createStore(Reducers, enhancer);
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
