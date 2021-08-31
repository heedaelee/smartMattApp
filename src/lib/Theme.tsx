/* eslint-disable prettier/prettier */

import {Dimensions} from 'react-native';

// 타입 선언
export type ITheme = {
  color: {
    white: string;
    black: string;
    blue: string;
  };
  fonts: {
    normal: string;
  };
};

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

export default {
  //Todo 컬러 기본 셋팅 하기. 어도비xd 보고
  color: {
    white: '#FFFFFF',
    black: '#000000',
    blue: '#0E76FF',
    lightGray: '#b4b2b2',
    gray: '#707070',
    green: '#2DD682',
  },
  fonts: {
    normal: '16px',
  },
  _WIDTH: _WIDTH,
  _HEIGHT: _HEIGHT,
  heatMap: {
    gradient: {
      0.4: 'blue',
      0.5: 'cyan',
      0.7: 'lime',
      0.8: 'yellow',
      1.0: 'red',
    },
    max: 4096,
  },
};
