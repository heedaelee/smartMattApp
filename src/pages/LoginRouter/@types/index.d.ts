/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
type LoginStackNaviParamList = {
  SignIn: undefined;
  SignUp: undefined;
  SignUp2: {email: string; password: string};
  SignUpBioDataAgree: undefined;
  SignUpPrivateAgree: undefined;
};

type TabFirstStackNaviParamList = {
  TabFirst: undefined;
  Modal: undefined;
  FullModal: undefined;
};

type registrySubmitParamList = {
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

interface UserContext {
  login: (email: string, password: string) => void;
  getUserInfo: () => void;
  logout: () => void;
}
