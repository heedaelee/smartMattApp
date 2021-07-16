/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
type LoginStackNaviParamList = {
  SignIn: undefined;
  SignUp: undefined;
  SignUp2: {email: string; password: string; username: string};
  SignUpBioDataAgree: undefined;
  SignUpPrivateAgree: undefined;
};

type TabFirstStackNaviParamList = {
  TabFirst: undefined;
  Modal: undefined;
  FullModal: undefined;
};

//등록, Redux setUser 둘다 사용
type registrySubmitParamList = {
  username: string;
  isLogin: boolean;
  email: string;
  password?: string;
  phoneNmbr: string;
  loginType: string;
  isAutoLogin: boolean;
  tokenId?: string;
  social?: {
    socialType?: string;
    socialId?: string;
  };
};

type SelectedPatientState = {
  id: string;
  name: string;
  description?: string;
};

interface UserContext {
  setUserInfo: (
    email: string,
    password: string,
    loginType: string,
    isAutoLogin: boolean,
  ) => void;
  getUserInfo: () => void;
  logout: () => void;
}
