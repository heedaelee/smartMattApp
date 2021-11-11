/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

//NOTE: 가상 기기일때
// export const NODE_API = 'http://10.0.2.2:4000/api';
//NOTE: 실제 기기일때 (7/27 스타벅스)
//1. 앱을 실행한다.
//2. node포트가 4000번이라면 <기기명:R3C...>
//   adb -s R3CMB08119P reverse tcp:4000 tcp:4000을 입력한다.
//3. 터미널에 4000 이라 뜨면 적용된거고, 아래처럼 localhost:4000번이 개발서버로 유효하다.
// export const NODE_API = 'http://localhost:4000/api';

//휴대폰
// export const NODE_API = 'http://192.168.138.19:4000/api';
//회사, 보조서버
// export const NODE_API = 'http://192.168.0.49:8000/api';

//기타, origin
const ip = '220.92.18.202';
export const NODE_API = `http://${ip}/api`;

//실제 기기 4000번 돌렸을떄
// const MQTT_ADDR = 'ws://220.92.18.202';
//내 폰 hotSpot으로 통신 ip
// const MQTT_ADDR = 'ws://192.168.138.19';
//pc랑 폰 같은 외부망 회선이면, 내부망 마지막 아이피주소가 달라도, 통신가능함.
//회사, 보조서버
// export const MQTT_ADDR = 'ws://192.168.0.49';

//기타, origin
export const MQTT_ADDR = `ws://${ip}`;

// 포트를 adb -s R3CMB08119P reverse tcp:8080 tcp:8080 로 변화하면 localhost도 통신 가능하다
// 유의할 건 같은 네트워크 IP주소여야 함.
// const MQTT_ADDR = 'ws://localhost';

// 프로토콜이 웹소켓일때는 8080포트를 사용한다. 1883은 tcp나 mqtt일때
export const mqtt_port = 8080;

// 에뮬레이터 일떄 모르겠음 아래것 안됨
// const MQTT_ADDR = 'ws://10.0.2.2';
// const mqtt_port = 8080;

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
  UPDATE_DEVICE_API: '/device/update-device',
  GET_PATIENT_LIST_API: '/device/get-patientList',
  DELETE_PATIENT_API: '/device/delete-patient',
};

//기타
export const jsonHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
};
