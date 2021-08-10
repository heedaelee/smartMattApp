/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

//NOTE: 가상 기기일때
export const NODE_API = 'http://10.0.2.2:4000/api';
//NOTE: 실제 기기일때 (7/27 스타벅스)
//1. 앱을 실행한다.
//2. node포트가 4000번이라면 <기기명:R3C...>
//   adb -s R3CMB08119P reverse tcp:4000 tcp:4000을 입력한다.
//3. 터미널에 4000 이라 뜨면 적용된거고, 아래처럼 localhost:4000번이 개발서버로 유효하다.
// export const NODE_API = 'http://localhost:4000/api';

/*
const SIGN_UP_API = '/auth/signUp';
const SIGN_IN_API = '/auth/signIn';
const IS_EMAIL_API = '/auth/isEmail';
const IS_PHONE_API = '/auth/isPhone';
*/

//Node에서 처리 모듈 단위
export const Auth = {
  SIGN_IN_API: '/auth/create-token',
  SIGN_UP_API: '/auth/sign-up',
  IS_EMAIL_API: '/auth/check-email',
  IS_PHONE_API: '/auth/check-phone',
  VERIFY_TOKEN_API: '/auth/verify',
};

export const Device = {
  IS_DEVICE_API: '/device/check-device',
  CREATE_DEVICE_API: '/device/create-device',
  GET_PATIENT_LIST_API: '/device/get-patientList',
};

//기타
export const jsonHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
};
