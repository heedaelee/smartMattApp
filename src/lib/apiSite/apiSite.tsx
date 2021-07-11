/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const NODE_API = 'http://10.0.2.2:4000/api';

/*
const SIGN_UP_API = '/auth/signUp';
const SIGN_IN_API = '/auth/signIn';
const IS_EMAIL_API = '/auth/isEmail';
const IS_PHONE_API = '/auth/isPhone';
*/

//Node에서 처리 모듈 단위
export const Auth = {
  SIGN_IN_API: '/auth/sign-in',
  SIGN_UP_API: '/auth/sign-up',
  IS_EMAIL_API: '/auth/check-email',
  IS_PHONE_API: '/auth/check-phone',
};

//기타
export const jsonHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
};
