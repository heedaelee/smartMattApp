/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import useInput from '~/hooks/useInput';
import SignInTemplate from '../../components/templates/LoginRouter/SignIn/SignInTemplate';

export type SignInProps = {
  navigation: StackNavigationProp<LoginStackNaviParamList, 'SignIn'>;
};

const SignIn = ({navigation}: SignInProps) => {
  /* DONE: 로그인 Template, hooks 불러오기 */
  const [autoLoginCheck, setAutoLoginCheck] = useState<boolean>(false);

  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');

  //TODO: 유효성 체크 후 api server로 submit 로직 만들기 
  const submit = () => {
    console.log(`email : ${email}, password : ${password}`);
  };

  return (
    <SignInTemplate
      autoLoginCheck={autoLoginCheck}
      setAutoLoginCheck={setAutoLoginCheck}
      navigation={navigation}
      setEmail={setEmail}
      setPassword={setPassword}
      submit={submit}
    />
  );
};

export default SignIn;
