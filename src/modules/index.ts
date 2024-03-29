/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  combineReducers,
  applyMiddleware,
  compose,
  createStore,
  // createStore,
} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import {configureStore} from '@reduxjs/toolkit';
import userReducer, {UserState} from '~/modules/user/user';
import selectedPatientReducer from '~/modules/selected/selected';

//기존
const Reducers = combineReducers({
  userReducer,
  selectedPatientReducer,
});
const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(logger))
    : composeWithDevTools(applyMiddleware(logger));

//이 형태 참조: velog-client-master
export type RootState = {
  user: UserState;
  selectedPatient: SelectedPatientState;

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
    selectedPatient: selectedPatientReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(logger),
});
