/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View} from 'react-native';
import InputBox from '~/components/molecules/InputBox';

type SignInFormProps = {
  showPassword?: JSX.Element;
  secureTextEntry?: boolean;
  state: {
    email: string;
    password: string;
  };
  setStateFirst: (active: string) => void;
  setStateSecond: (active: string) => void;
  validation: {
    email: any;
    password: {
      isPassword: boolean;
      setIsPassword: (active: boolean) => void;
    };
  };
};

const SignInForm = ({
  showPassword,
  secureTextEntry,
  setStateFirst,
  setStateSecond,
  validation,
  state,
}: SignInFormProps) => {
  const {email, password} = state;

  return (
    <>
      <InputBox
        menuText={'이메일'}
        state={email}
        setState={setStateFirst}
        validationType={'email'}
        setValidationToggle={validation.email.setIsEmail}
        validationState={validation.email.isEmail}
      />
      <View style={{marginTop: 30}} />
      <InputBox
        menuText={'비밀번호'}
        secureTextEntry={secureTextEntry}
        state={password}
        setState={setStateSecond}
        validationType={'password'}
        setValidationToggle={
          validation.password.setIsPassword
        }
        validationState={validation.password.isPassword}>
        {showPassword ? showPassword : ''}
      </InputBox>
    </>
  );
};

export default SignInForm;
