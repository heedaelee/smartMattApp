/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
type LoginStackNaviParamList = {
  SignIn: undefined;
  SignUp: undefined;
  SignUp2: {email: string; password: string};
  SignUpBioDataAgree: undefined;
  SignUpPrivateAgree: undefined;
  AddDevice: undefined;
  PatientEditor: {screen:string, deviceSerial:string, setDeviceSerial:(active:any) => void}
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
  login: (
    email: string,
    password: string,
    loginType: string,
    isAutoLogin: boolean,
  ) => void;
  getUserInfo: () => void;
  logout: () => void;
}
