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
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<registrySubmitParamList>) {
      if (action.payload.id) {
        state.id = action.payload.id;
      };
      state.username = action.payload.username || '';
      state.email = action.payload.email || '';
      state.isLogin = action.payload.isLogin || false;
      state.loginType = action.payload.loginType  || '';
      state.password = action.payload.password || '';
      state.phoneNmbr = action.payload.phoneNmbr || '';
      state.social = action.payload.social || {
        socialType: '',
        socialId: '',
      };
      state.token = action.payload.token || '';
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
