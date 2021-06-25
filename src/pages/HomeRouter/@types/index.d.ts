/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
type HomeStackNaviParamList = {
  Bluetooth: undefined;
  BottomNaviRouter: {screen: string} | undefined;
  HomeStack: undefined;
  AlarmStack: undefined;
  MyPageStack: undefined;
  PatientEditor: {
    screen: '환자 추가' | '환자 상세' | '환자 수정';
  };
  HomeTabRouter: {
    screen: '환자 목록' | '실시간 센서';
  };
  AlarmTabRouter: {
    screen: '알림 목록' | '알림 셋팅';
  };
  HeatMap: undefined;
};

type TabRouterParamList = {
  PatientList: undefined;
  HeatMapTemplate: undefined;
};

type AlarmItem = {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
};

type submitAlarmData = {
  hours?: number;
  minutes?: number;
};
