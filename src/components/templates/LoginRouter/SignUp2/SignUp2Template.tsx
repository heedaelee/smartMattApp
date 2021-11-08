/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import styled from 'styled-components/native';
import {Button} from '~/components/atoms/Button';
import {Container} from '~/components/atoms/Container';
import {MenuText} from '~/components/atoms/Text';
import InputBox from '~/components/molecules/InputBox';
import AgreeCheckForm from '~/components/organisms/AgreeCheckForm';
import DownKeyboard from '~/lib/DownKeyboard';
import Theme from '~/lib/Theme';

type SignUp2TemplateProps = {
  navigation: StackNavigationProp<LoginStackNaviParamList>;
  route: RouteProp<LoginStackNaviParamList, 'SignUp2'>;
  state: {
    phoneNmbr: string;
    phoneAuthNmbr: string;
    isPhone: boolean;
    isphoneAuthNmbr: boolean;
    bioDataAgree: boolean;
    privateDataAgree: boolean;
    checkedExist: string;
  };
  setState: {
    setPhoneNmbr: (active: string) => void;
    setPhoneAuthNmbr: (active: string) => void;
    setIsPhone: (active: boolean) => void;
    setIsphoneAuthNmbr: (active: boolean) => void;
    setBioDataAgree: (active: boolean) => void;
    setPrivateDataAgree: (active: boolean) => void;
    setCheckedExist: (active: string) => void;
  };
  phoneNmbrSender: () => void;
  phoneAuthNmbrSender: () => void;
  registrySubmit: (value: registrySubmitParamList) => void;
};

const SignUp2Template = ({
  navigation,
  route,
  state,
  setState,
  phoneNmbrSender,
  phoneAuthNmbrSender,
  registrySubmit,
}: SignUp2TemplateProps) => {
  const {email, password, username} = route.params;

  // FORTEST:
  // const {email, password, username} = {
  //   email: '111@google.com',
  //   password: 'qqqqqq@1',
  //   username: 'test',
  // };

  const {
    phoneNmbr,
    phoneAuthNmbr,
    isPhone,
    isphoneAuthNmbr,
    bioDataAgree,
    privateDataAgree,
    checkedExist,
  } = state;
  const {
    setPhoneNmbr,
    setPhoneAuthNmbr,
    setIsPhone,
    setIsphoneAuthNmbr,
    setBioDataAgree,
    setPrivateDataAgree,
    setCheckedExist,
  } = setState;

  return (
    <DownKeyboard>
      <Container>
        {/* NOTE:인증번호 전송 DONE: vali*/}
        <InputBox
          menuText={'휴대폰 번호를 입력해주세요'}
          placeholder={'"-" 빼고 입력해주세요'}
          setState={setPhoneNmbr}
          state={phoneNmbr}
          validationType={'phone'}
          setValidationToggle={setIsPhone}
          validationState={isPhone}
          setCheckedExist={setCheckedExist}
          checkedExist={checkedExist}
        />
        <SmallButtonView>
          {isPhone ? (
            <Button onPress={phoneNmbrSender} size={'small'}>
              인증번호 전송
            </Button>
          ) : (
            <Button size={'small'} disabled={true}>
              인증번호 전송
            </Button>
          )}
        </SmallButtonView>
        <RowView />
        {/* NOTE:인증번호 입력 Done: vali*/}
        <InputBox
          secureTextEntry={false}
          menuText={'인증번호를 입력해주세요'}
          placeholder={'숫자 4자리'}
          setState={setPhoneAuthNmbr}
          state={phoneAuthNmbr}
          validationType={'phoneAuth'}
          validationState={isphoneAuthNmbr}
          setValidationToggle={setIsphoneAuthNmbr}
          keyboardType={'number-pad'}
          maxLength={4}
          //disabled을 위해..
          // checkedExist={checkedExist}
        />
        <SmallButtonView2>
          {isphoneAuthNmbr ? (
            <Button onPress={phoneAuthNmbrSender} size={'small'}>
              인증하기
            </Button>
          ) : (
            <Button size={'small'} disabled={true}>
              인증하기
            </Button>
          )}
        </SmallButtonView2>
        <RowTextView>
          <MenuText textAlign={'left'} size={'14px'} color={Theme.color.gray}>
            {'매트 사용을 위한 아래 동의가 필요합니다'}
          </MenuText>
        </RowTextView>
        {/* checkForm */}
        <AgreeCheckForm
          toggleState={bioDataAgree}
          setToggleState={setBioDataAgree}
          navigation={navigation}
          naviPage="SignUpBioDataAgree">
          {'생체 데이터 제공 동의(필수)'}
        </AgreeCheckForm>
        <AgreeCheckForm
          toggleState={privateDataAgree}
          setToggleState={setPrivateDataAgree}
          navigation={navigation}
          naviPage="SignUpPrivateAgree">
          {'이용 및 개인정보 취급약관 동의(필수)'}
        </AgreeCheckForm>
        <RowView />

        {/* NOTES:original */}
        {isPhone &&
        isphoneAuthNmbr &&
        bioDataAgree &&
        privateDataAgree &&
        checkedExist === 'success' ? (
          <Button
            disabled={false}
            onPress={() =>
              registrySubmit({
                username,
                email,
                password,
                phoneNmbr,
                loginType: 'e', //email
                isAutoLogin: true,
                isLogin: true,
              })
            }>
            등록하기
          </Button>
        ) : (
          <Button disabled={true}>등록하기</Button>
        )}

        {/* FORTEST */}
        {/* <Button
          disabled={false}
          onPress={() =>
            registrySubmit({
              username: 'david',
              email: '2@112.com',
              password: '1234566',
              loginType: 'e',
              phoneNmbr: '1',
              isAutoLogin: true,
              isLogin: true,
            })
          }>
          등록하기
        </Button> */}
      </Container>
    </DownKeyboard>
  );
};

/* border로 test 
border: 1px;
border-color: gray;
*/

const RowView = styled.View`
  margin-top: 35px;
`;
const RowTextView = styled.View`
  margin: 20px 0px;
  width: 100%;
`;

const SmallButtonView = styled.View`
  width: ${Theme._HEIGHT / 8}px;
  position: absolute;
  top: 20px;
  right: 10%;
`;
const SmallButtonView2 = styled.View`
  width: ${Theme._HEIGHT / 8}px;
  position: absolute;
  top: 110px;
  right: 10%;
`;

export default SignUp2Template;
