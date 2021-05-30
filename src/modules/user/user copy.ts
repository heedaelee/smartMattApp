/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActionType, createAction,
  createReducer
} from 'typesafe-actions';

//NOTE: 액션 type 정의
const SET_USER = 'user/SET_USER';

//NOTE: 액션 생성 함수 선언
//파라미터는 제네릭타입 형식으로 <> 넣어준다, if using createAction()
export const setUser = createAction(
  SET_USER,
)<registrySubmitParamList>();

const actions = {setUser};
type UserAction = ActionType<typeof actions>;

export type UserState = {
  email: string;
  password: string;
  phoneNmbr: string;
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
  phoneNmbr: '',
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

export default user;
