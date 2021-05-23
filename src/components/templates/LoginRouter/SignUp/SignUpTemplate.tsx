/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import styled from 'styled-components/native';
import { Button } from '~/components/atoms/Button';
import { Container } from '~/components/atoms/Container';
import InputBox from '~/components/molecules/InputBox';
import Theme from '~/lib/Theme';

type SignUpTemplateProps = {
  navigation: StackNavigationProp<
    LoginStackNaviParamList,
    'SignUp'
  >;
  email: string;
  password: string;
  password2: string;
  setEmail: (active: string) => void;
  setPassword: (active: string) => void;
  setPassword2: (active: string) => void;
  emailCheckSubmit: (active: string) => void;
  validation: {
    email: any;
    password: {
      isPassword: boolean;
      setIsPassword: (active: boolean) => void;
      isPassword2: boolean;
      setIsPassword2: (active: boolean) => void;
    };
  };
  moveToSignUp2: () => void;
};

/*TODO: 폼그리기 after 버튼 수정후 */
const SignUpTemplate = ({
  navigation,
  email,
  password,
  password2,
  setEmail,
  emailCheckSubmit,
  setPassword,
  setPassword2,
  validation,
  moveToSignUp2,
}: SignUpTemplateProps) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <InputBox
          menuText={'이메일을 입력해주세요'}
          placeholder={'이메일 주소 입력'}
          setState={setEmail}
          state={email}
          validationType={'email'}
          setValidationToggle={validation.email.setIsEmail}
          validationState={validation.email.isEmail}
        />
        <SmallButtonView>
          {validation.email.isEmail ? (
            <Button
              onPress={emailCheckSubmit}
              size={'small'}>
              이메일 확인
            </Button>
          ) : (
            <Button size={'small'} disabled={true}>
              이메일 확인
            </Button>
          )}
        </SmallButtonView>

        <RowView />
        <InputBox
          secureTextEntry={true}
          menuText={'비밀번호를 입력해주세요'}
          placeholder={
            '비밀번호는 8~20자 이내 숫자,영어,특수기호를 포함해주세요'
          }
          setState={setPassword}
          state={password}
          validationType={'password'}
          setValidationToggle={
            validation.password.setIsPassword
          }
          validationState={validation.password.isPassword}
        />
        <RowView />
        <InputBox
          secureTextEntry={true}
          menuText={'비밀번호를 다시 한번 입력해주세요'}
          placeholder={'비밀번호 재입력'}
          setState={setPassword2}
          state={password2}
          state2={password}
          validationType={'password2'}
          setValidationToggle={
            validation.password.setIsPassword2
          }
          validationState={validation.password.isPassword2}
        />
        <RowView />
        {/* TODO: input invalid 상태일떈 disabled:true 주기! */}
        {validation.email.isEmail &&
        validation.password.isPassword &&
        validation.password.isPassword2 ? (
          <Button onPress={moveToSignUp2}>계속하기</Button>
        ) : (
          <Button disabled={true}>계속하기</Button>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};

/* border로 test 
border: 1px;
border-color: gray;
*/

const RowView = styled.View`
  margin-top: 35px;
`;
const SmallButtonView = styled.View`
  width: ${Theme._HEIGHT / 8}px;
  position: absolute;
  top: 20px;
  right: 10%;
`;

const RowValidation = styled.View`
  position: absolute;
`;

export default SignUpTemplate;
