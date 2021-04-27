/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import styled from 'styled-components/native';
import {
  Text,
  StyleSheet,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../../lib/Theme';

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

export type SignInProps = {
  navigation: StackNavigationProp<LoginStackNaviParamList, 'SignIn'>;
};

const SignIn = ({navigation}: SignInProps) => {
  /* TODO: 로그인 Template, hooks 불러오기 */

  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [iconName, setIconName] = useState<string>('eye');
  const [autoLoginCheck, setAutoLoginCheck] = useState<boolean>(false);

  const onIconPress = () => {
    let NewIconName = secureTextEntry ? 'eye-slash' : 'eye';
    setIconName(NewIconName);
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <LogoWrapper>
          <Logo source={require('../../../asset/img/logo.png')} />
        </LogoWrapper>
        <LoginWrapper>
          <InputBox>
            <LeftMenuText>이메일</LeftMenuText>
            <InputData placeholderTextColor="gray" />
          </InputBox>
          <InputBox style={{marginTop: 30}}>
            <LeftMenuText>비밀번호</LeftMenuText>
            <InputData
              placeholderTextColor="gray"
              secureTextEntry={secureTextEntry}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: _WIDTH / 40,
                top: _WIDTH / 20,
              }}
              onPress={() => onIconPress()}>
              <Icon
                name={iconName}
                size={20}
                style={{
                  color: 'gray',
                }}
              />
            </TouchableOpacity>
          </InputBox>
          <RowView>
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
            <MenuText
              style={{color: Theme.color.blue, fontSize: 13, marginLeft: 5}}>
              자동로그인
            </MenuText>
          </RowView>
          <RowView>
            <LoginBtn>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: _WIDTH / 18,
                  color: 'white',
                  fontFamily: 'SpoqaHanSansNeo-Medium',
                }}>
                로그인
              </Text>
            </LoginBtn>
          </RowView>
          <RowView style={{marginTop: 0, justifyContent: 'space-around'}}>
            <MenuText style={{color: 'gray'}}>아이디찾기</MenuText>
            <MenuText style={{color: 'gray'}}>비밀번호찾기</MenuText>
          </RowView>
          <RowView style={css.snsLoginView}>
            <Banner
              source={require('../../../asset/img/KakaoLoginBanner.png')}
              style={{marginBottom: 5}}
            />
            <Banner
              source={require('../../../asset/img/NaverLoginBanner.png')}
            />
            <MenuText style={{color: 'gray', marginTop: 10}}>
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

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 5% 7% 3% 7%;
`;
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
const InputBox = styled.View`
  width: 100%;
`;
const LeftMenuText = styled.Text`
  width: 100%;
  color: black;
  font-size: 16px;
  font-family: 'SpoqaHanSansNeo-Medium';
  text-align: left;
`;
const MenuText = styled.Text`
  color: black;
  font-size: 16px;
  font-family: 'SpoqaHanSansNeo-Medium';
`;
const LoginWrapper = styled.View`
  flex: 7;
  width: 100%;
  height: ${_HEIGHT * 0.4}px;
  background-color: white;
  align-items: center;
`;
const InputData = styled.TextInput`
  color: black;
  width: 100%;
  height: ${_HEIGHT / 20}px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  font-size: ${_WIDTH / 32}px;
`;
const RowView = styled.View`
  width: 100%;
  margin: 10px 0px;
  flex-direction: row;
  align-items: center;
`;
const ColumnView = styled.View`
  border: 1px;
  border-color: gray;
  width: 100%;
  margin: 10px 0px;
  flex-direction: row;
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
});

export default SignIn;
