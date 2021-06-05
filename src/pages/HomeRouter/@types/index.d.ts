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
  HomeTabRouter: undefined;
};

type TabRouterParamList = {
  PatientList: undefined;
  HeatMapTemplate: undefined;
};
