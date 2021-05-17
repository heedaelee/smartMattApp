/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  combineReducers,
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import user, {UserState} from '~/modules/user/user';

const Reducers = combineReducers({user});
const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(logger))
    : composeWithDevTools(applyMiddleware(logger));

//이 형태 참조: velog-client-master
export type RootState = {
  user: UserState;

  /* ex)
  header: HeaderState;
  post: PostState;
  error: ErrorState;
  scroll: ScrollState; */
};

export const store = createStore(Reducers, enhancer);
