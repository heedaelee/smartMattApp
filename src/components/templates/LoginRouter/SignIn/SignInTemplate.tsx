/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import {MenuText} from '~/components/atoms/Text';
import Form from '~/components/organisms/Form';
import Theme from '~/lib/Theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from '~/components/atoms/Button';
import {Container} from '~/components/atoms/Container';

type SignInTemplateProps = {
  autoLoginCheck: boolean;
  setAutoLoginCheck: (active: boolean) => void;
  navigation: StackNavigationProp<LoginStackNaviParamList, 'SignIn'>;
  setEmail: (active: string) => void;
  setPassword: (active: string) => void;
  submit: () => void;
};
const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

const SignInTemplate = ({
  autoLoginCheck,
  setAutoLoginCheck,
  navigation,
  setPassword,
  setEmail,
  submit,
}: SignInTemplateProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [iconName, setIconName] = useState<string>('eye');

  const onIconPress = () => {
    let NewIconName = secureTextEntry ? 'eye-slash' : 'eye';
    setIconName(NewIconName);
    setSecureTextEntry(!secureTextEntry);
  };

  //비밀번호 보여주는 토글(완료)
  const showPassword = (
    <TouchableOpacity
      style={css.showPassTouchable}
      onPress={() => onIconPress()}>
      <Icon
        name={iconName}
        size={20}
        style={{
          color: 'gray',
        }}
      />
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <LogoWrapper>
          <Logo source={require('~/asset/img/logo.png')} />
        </LogoWrapper>
        <LoginWrapper>
          <Form
            showPassword={showPassword}
            secureTextEntry={secureTextEntry}
            setStateFirst={setEmail}
            setStateSecond={setPassword}
          />
          <RowView style={{marginTop: 20}}>
            {autoLoginCheck ? (
              <Icon
                name="check-square-o"
                size={_WIDTH / 18}
                onPress={() => setAutoLoginCheck(false)}
                color={Theme.color.blue}
              />
            ) : (
              <Icon
                name="square-o"
                size={_WIDTH / 18}
                onPress={() => setAutoLoginCheck(true)}
                color={Theme.color.blue}
              />
            )}
            <View style={{marginLeft: 5}}>
              <MenuText color={Theme.color.blue} size={'15px'}>
                자동로그인
              </MenuText>
            </View>
          </RowView>
          <RowView style={{marginTop: 20}}>
            <Button onPress={submit}>로그인</Button>
          </RowView>
          <RowView style={{marginTop: 0, justifyContent: 'space-around'}}>
            <MenuText color={'gray'}>아이디찾기</MenuText>
            <MenuText color={'gray'}>비밀번호찾기</MenuText>
          </RowView>
          <RowView style={css.snsLoginView}>
            <Banner
              source={require('~/asset/img/KakaoLoginBanner.png')}
              style={{marginBottom: 5}}
            />
            <Banner source={require('~/asset/img/NaverLoginBanner.png')} />
            <MenuText
              color={'gray'}
              style={{marginTop: 10}}
              onPress={() => navigation.navigate('SignUp')}>
              아이디가 없으신가요?
            </MenuText>
          </RowView>
        </LoginWrapper>
      </Container>
    </TouchableWithoutFeedback>
  );
};

/* border로 test 
border: 1px;
border-color: gray;
*/

const LogoWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 2;
`;
const Logo = styled.Image`
  width: ${_WIDTH / 4}px;
  height: ${_WIDTH / 4}px;
  border-radius: ${_HEIGHT / 25}px;
`;
const Banner = styled.Image`
  width: 100%;
`;
const LoginWrapper = styled.View`
  flex: 7;
  width: 100%;
  height: ${_HEIGHT * 0.4}px;
  background-color: white;
  align-items: center;
`;
const RowView = styled.View`
  width: 100%;
  margin: 10px 0px;
  flex-direction: row;
  align-items: center;
`;
const LoginBtn = styled.TouchableOpacity`
  width: 100%;
  height: ${_HEIGHT / 15}px;
  background-color: ${Theme.color.blue};
  justify-content: center;
  border-radius: 35px;
`;

const css = StyleSheet.create({
  snsLoginView: {
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  showPassTouchable: {
    position: 'absolute',
    right: Theme._WIDTH / 40,
    top: Theme._WIDTH / 20,
  },
});
export default SignInTemplate;
