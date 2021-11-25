/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
type HomeStackNaviParamList = {
  Bluetooth: undefined;
  BottomNaviRouter: {screen: string} | undefined;
  HomeStack: undefined;
  AlarmStack: undefined;
  MyPageStack: undefined;
  AddDevice: {
    screen: '기기 추가';
  };
  PatientEditor: {
    screen: '환자 추가' | '환자 상세' | '환자 수정';
    deviceCode?: string;
    patient_id?: string;
  };
  HomeTabRouter: {
    screen: '환자 목록' | '실시간 센서';
  };
  AlarmTabRouter: {
    screen: '알림 목록' | '알림 셋팅';
  };
  HeatMap: undefined;
};

// type TabRouterParamList = {
//   PatientList: undefined;
//   HeatMapTemplate: undefined;
// };

type nomalListItem = {
  id: string;
  patientName: string;
  patientCondition: string;
  isRead: boolean;
};
type AlarmListItem = {
  id: string;
  type: string | undefined;
  receiver_id: string;
  title?: string;
  message: string;
  isRead: boolean;
  isDelete: boolean;
  reg_dttm: string;
};

type submitAlarmData = {
  hours: number | string;
  minutes: number | string;
};
