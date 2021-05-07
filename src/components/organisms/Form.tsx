/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View} from 'react-native';
import InputBox from '~/components/molecules/InputBox';

type FormProps = {
  showPassword?: JSX.Element;
  secureTextEntry?: boolean;
  setStateFirst: (active: string) => void;
  setStateSecond: (active: string) => void;
};

const Form = ({
  showPassword,
  secureTextEntry,
  setStateFirst,
  setStateSecond,
}: FormProps) => {
  return (
    <>
      <InputBox menuText={'이메일'} setState={setStateFirst} />
      <View style={{marginTop: 30}} />
      <InputBox
        menuText={'비밀번호'}
        secureTextEntry={secureTextEntry}
        setState={setStateSecond}>
        {showPassword ? showPassword : ''}
      </InputBox>
    </>
  );
};

export default Form;
