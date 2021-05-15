/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createAction,
  ActionType,
  createReducer,
} from 'typesafe-actions';
import produce from 'immer';

//NOTE: 액션 type 정의
const SET_USER = 'user/SET_USER';

//NOTE: 액션 생성 함수 선언
export const setUser = createAction(SET_USER)();

const actions = {setUser};
type UserAction = ActionType<typeof actions>;

type UserState = {
  email: string;
  password: string;
  phone: string;
  loginType: string;
  tokenId: string;
  social?: {
    socialType: string;
    socialId: string;
  };
};

const initialState: UserState = {
  email: '',
  password: '',
  phone: '',
  loginType: '',
  tokenId: '',
  social: {
    socialType: '',
    socialId: '',
  },
};

//NOTE: 리듀서 생성
const user = createReducer<UserState, UserAction>(
  initialState,
  {
    [SET_USER]: (state, action) => ({...state, action}),
  },
);

export default user;
