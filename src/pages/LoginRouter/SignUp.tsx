/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {StackNavigationProp} from '@react-navigation/stack';
import Axios from 'axios';
import React from 'react';
import SignUpTemplate from '~/components/templates/LoginRouter/SignUp/SignUpTemplate';
import useBoolean from '~/hooks/useBoolean';
import useInput from '~/hooks/useInput';
import {NODE_API, Auth, jsonHeader} from '~/lib/apiSite/apiSite';

export type SignUpProps = {
  navigation: StackNavigationProp<LoginStackNaviParamList, 'SignUp'>;
};

const SignUp = ({navigation}: SignUpProps) => {
  /*Done 21/5/9: 
  1. 이메일 확인 액션, 유효성 체크
  2. 이메일 주소, 비밀번호입력, 확인 유효성 체크
  3. 계속하기 button disabled -> able 
  */

  //NOTE: INPUT state
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [password2, setPassword2] = useInput('');
  const [name, setName] = useInput('');

  //NOTE: 유효성 체크 토글: 유효성 정상이면 true
  const [isEmail, setIsEmail] = useBoolean(false);
  const [isPassword, setIsPassword] = useBoolean(false);
  const [isPassword2, setIsPassword2] = useBoolean(false);
  const [isName, setIsName] = useBoolean(false);

  //코드성 변수 : unchecked = '', duplicated = 'fail', fine = 'success'
  const [checkedExist, setCheckedExist] = useInput('');

  //이메일 post check 토글 할필요 있네.. 버튼 이 맞는 값이 되야 작동시키지
  //console.log(`SignUp component : ${isEmail} `);

  //이메일 체크 함수
  const emailCheckSubmit = async () => {
    // TODO: API 서버로 이메일 체크 호출
    console.log('emailCheck : ', email);
    const postData = JSON.stringify({email: email});

    await Axios.post(NODE_API + Auth.IS_EMAIL_API, postData, jsonHeader).then(res => {
      if (res.data.success) {
        if (res.data.used) {
          setCheckedExist('fail');
        } else {
          setCheckedExist('success');
        }
      } else {
        console.log('emailCheckSubmit server api fail');
        console.dir(res.data);
      }
    });
  };

  //signUp2로 이동 네비게이터 함수:파라미터 전달 {email,password}
  const moveToSignUp2 = () => {
    navigation.navigate('SignUp2', {
      email: email,
      password: password,
      //7/13 추가
      username: name,
    });
  };

  return (
    <SignUpTemplate
      navigation={navigation}
      email={email}
      password={password}
      password2={password2}
      name={name}
      setEmail={setEmail}
      setPassword={setPassword}
      setPassword2={setPassword2}
      setName={setName}
      validation={{
        email: {isEmail, setIsEmail, checkedExist, setCheckedExist},
        password: {
          isPassword,
          setIsPassword,
          isPassword2,
          setIsPassword2,
        },
        name: {
          isName,
          setIsName,
        },
      }}
      emailCheckSubmit={emailCheckSubmit}
      moveToSignUp2={moveToSignUp2}
    />
  );
};

export default SignUp;
