/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from '~/components/atoms/Button';
import Theme from '~/lib/Theme';
import InputBox from '~/components/molecules/InputBox';
import {Container} from '~/components/atoms/Container';
import {RouteProp} from '@react-navigation/core';
import {MenuText} from '~/components/atoms/Text';
import AgreeCheckForm from '~/components/organisms/AgreeCheckForm';

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
  };
  setState: {
    setPhoneNmbr: (active: string) => void;
    setPhoneAuthNmbr: (active: string) => void;
    setIsPhone: (active: boolean) => void;
    setIsphoneAuthNmbr: (active: boolean) => void;
    setBioDataAgree: (active: boolean) => void;
    setPrivateDataAgree: (active: boolean) => void;
  };
  phoneNmbrSender: () => void;
  phoneAuthNmbrSender: () => void;
  registrySubmit: (value: any) => void;
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
  //TODO: 임시로 테스트 위해 주석, 나중에 품 5/11
  // const {email, password} = route.params;
  const {email, password} = {
    email: '111@google.com',
    password: 'qqqqqq@1',
  };

  const {
    phoneNmbr,
    phoneAuthNmbr,
    isPhone,
    isphoneAuthNmbr,
    bioDataAgree,
    privateDataAgree,
  } = state;
  const {
    setPhoneNmbr,
    setPhoneAuthNmbr,
    setIsPhone,
    setIsphoneAuthNmbr,
    setBioDataAgree,
    setPrivateDataAgree,
  } = setState;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        {/* NOTE:인증번호 전송 TODO: vali*/}
        <InputBox
          menuText={'휴대폰 번호를 입력해주세요'}
          placeholder={'"-" 빼고 입력해주세요'}
          setState={setPhoneNmbr}
          state={phoneNmbr}
          validationType={'phone'}
          setValidationToggle={setIsPhone}
          validationState={isPhone}
        />
        <SmallButtonView>
          {isPhone ? (
            <Button
              onPress={phoneNmbrSender}
              size={'small'}>
              인증번호 전송
            </Button>
          ) : (
            <Button size={'small'} disabled={true}>
              인증번호 전송
            </Button>
          )}
        </SmallButtonView>
        <RowView />
        {/* NOTE:인증번호 입력 TODO: vali*/}
        <InputBox
          secureTextEntry={true}
          menuText={'인증번호를 입력해주세요'}
          placeholder={'숫자 4자리'}
          setState={setPhoneAuthNmbr}
          state={phoneAuthNmbr}
          validationType={'phoneAuth'}
          validationState={isphoneAuthNmbr}
          setValidationToggle={setIsphoneAuthNmbr}
        />
        <SmallButtonView2>
          {isphoneAuthNmbr ? (
            <Button
              onPress={phoneAuthNmbrSender}
              size={'small'}>
              인증하기
            </Button>
          ) : (
            <Button size={'small'} disabled={true}>
              인증하기
            </Button>
          )}
        </SmallButtonView2>
        <RowTextView>
          <MenuText
            textAlign={'left'}
            size={'14px'}
            color={Theme.color.gray}>
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
        {isPhone &&
        isphoneAuthNmbr &&
        bioDataAgree &&
        privateDataAgree ? (
          <Button
            disabled={false}
            onPress={() =>
              registrySubmit({email, password, phoneNmbr})
            }>
            등록하기
          </Button>
        ) : (
          <Button disabled={true}>등록하기</Button>
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
