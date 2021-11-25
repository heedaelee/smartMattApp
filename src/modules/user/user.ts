/* eslint-disable prettier/prettier */
/* import {
  createAction,
  ActionType,
  createReducer,
} from 'typesafe-actions';
import produce from 'immer'; */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type UserState = {
  id?: string;
  username: string;
  isLogin: boolean;
  email: string;
  password: string;
  phoneNmbr: string;
  loginType: string;
  token?: string;
  isAutoLogin: boolean;
  social?: {
    socialType?: string;
    socialId?: string;
  };
  fcm_token?: string;
};

/* NOTE: 액션 type 정의
const SET_USER = 'user/SET_USER';

NOTE: 액션 생성 함수 선언
파라미터는 제네릭타입 형식으로 <> 넣어준다, if using createAction()
export const setUser = createAction(
  SET_USER,
)<registrySubmitParamList>();

const actions = {setUser};
type UserAction = ActionType<typeof actions>; */

export const initialState: UserState = {
  id: '',
  username: '',
  isLogin: false,
  email: '',
  password: '',
  phoneNmbr: '',
  loginType: '',
  token: '',
  isAutoLogin: true,
  social: {
    socialType: '',
    socialId: '',
  },
  fcm_token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<registrySubmitParamList>) {
      action.payload.id && (state.id = action.payload.id);
      action.payload.username && (state.username = action.payload.username);
      action.payload.email && (state.email = action.payload.email);
      action.payload.isLogin && (state.isLogin = action.payload.isLogin);
      action.payload.loginType && (state.loginType = action.payload.loginType);
      action.payload.password && (state.password = action.payload.password);
      action.payload.phoneNmbr && (state.phoneNmbr = action.payload.phoneNmbr);
      action.payload.social && (state.social = action.payload.social);
      action.payload.token && (state.token = action.payload.token);
      action.payload.fcm_token && (state.fcm_token = action.payload.fcm_token);
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
