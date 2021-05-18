/* eslint-disable prettier/prettier */
/* import {
  createAction,
  ActionType,
  createReducer,
} from 'typesafe-actions';
import produce from 'immer'; */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type UserState = {
  isLogin: boolean;
  email: string;
  password: string;
  phoneNmbr: string;
  loginType: string;
  tokenId?: string;
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
  isLogin: false,
  email: '',
  password: '',
  phoneNmbr: '',
  loginType: '',
  tokenId: '',
  social: {
    socialType: '',
    socialId: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<registrySubmitParamList>,
    ) {
      state = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;

//TODO: export 안했고,
//https://ridicorp.com/story/how-to-use-redux-in-ridi/ 여기에 typescript 적용 부분부터..

/* const initialState: UserState = {
  email: '',
  password: '',
  phoneNmbr: '',
  loginType: '',
  tokenId: '',
  social: {
    socialType: '',
    socialId: '',
  },
};

NOTE: 리듀서 생성
const userReducer = createReducer<UserState, UserAction>(
  initialState,
  {
    [SET_USER]: (state, action) => {
      const {
        email,
        loginType,
        password,
        phoneNmbr,
      } = action.payload;
      return {
        ...state,
        email,
        loginType,
        password,
        phoneNmbr,
      };
    },
  },
);

export default userReducer; */
