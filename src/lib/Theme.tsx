/* eslint-disable prettier/prettier */
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

export default {
  //Todo 컬러 기본 셋팅 하기. 어도비xd 보고
  color: {
    white: '#FFFFFF',
    black: '#000000',
    blue: '#0E76FF',
    gray: '#707070',
  },
  fonts: {
    normal: '16px',
  },
};
