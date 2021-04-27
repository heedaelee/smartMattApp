/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Styled from 'styled-components/native';
import {Text} from 'react-native';

export type SignUpProps = {
  navigation: StackNavigationProp<LoginStackNaviParamList, 'SignUp'>;
};

const SignUp = ({navigation}: SignUpProps) => {
  //TODO: 회원가입 설치

  return <Text>SignUp Page</Text>;
};

export default SignUp;
