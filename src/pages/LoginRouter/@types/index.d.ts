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
  id?: string;
  username?: string;
  isLogin?: boolean;
  email?: string;
  password?: string;
  phoneNmbr?: string;
  loginType?: string;
  isAutoLogin?: boolean;
  token?: string;
  social?: {
    socialType?: string;
    socialId?: string;
  };
};

type SelectedPatientState = {
  id: string;
  patientName: string;
  patientCondition?: string;
};

type UserContext = {
  //localStorage에 기록
  setUserInfo: (
    id: string,
    email: string,
    token: string,
    loginType: string,
    isLogin: boolean,
  ) => void;
  getUserInfo: (active?: any) => void;
  logout: () => void;
};
ß