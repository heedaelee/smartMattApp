/* eslint-disable prettier/prettier */
import React, {createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoggedUser} from '~/hooks/useReduce';
import {initialState} from '~/modules/user/user';
import Axios from 'axios';
import {NODE_API, Auth, jsonHeader} from '~/lib/apiSite/apiSite';
import {Alert} from 'react-native';
const defaultContext: UserContext = {
  setUserInfo: () => {},
  getUserInfo: () => {},
  logout: () => {},
};

const UserContext = createContext(defaultContext);

type Props = {
  children: JSX.Element | Array<JSX.Element>;
};

const UserProvider = ({children}: Props) => {
  //NOTE:How to process?
  // userInfo는 redux에 isLogin의 boolean 값에 따라 라우터에서
  // 조건 걸거임. 즉 login 액션시 isLogin: true -> rerendering -> acting routers
  // TODO:APi 서버 통해 Token 및 user정보 받아오기

  useEffect(() => {
    getUserInfo();
  }, []);

  const [userState, setUserReducer] = useLoggedUser();

  const setUserInfo: UserContext['setUserInfo'] = async (
    email,
    token,
    loginType,
    isLogin,
  ) => {
    try {
      await AsyncStorage.setItem(
        '@loginInfo',
        JSON.stringify({
          email: email,
          loginType: loginType,
          isLogin: isLogin,
          token: token,
        }),
      );

      /* user Data가 있을시 set to Redux */
      const storageValue = await AsyncStorage.getItem('@loginInfo');
      console.log(`저장된 @loginInfo : ${JSON.stringify(storageValue)}`);
      setUserReducer({email, loginType, isLogin, token});
      console.log('reduce 셋 완료');
    } catch (e) {
      console.log(`error ${e}`);
    }
  };

  const getUserInfo = () => {
    console.log('1.getUserInfo 호출됨');
    AsyncStorage.getItem('@loginInfo')
      .then(value => {
        if (value) {
          console.log(`2.getUserInfo()에서 value 값 : ${value} `);
          const parsedValue = JSON.parse(value);
          if (parsedValue.token) {
            console.log(`3.token 존재, 보낼token : ${parsedValue.token}`);
            Axios.get(NODE_API + Auth.VERIFY_TOKEN_API, {
              headers: {Authorization: `Bearer ${parsedValue.token}`},
            })
              .then(res => {
                console.log(`4.VERIFY_TOKEN_API 호출후 res값 ${JSON.stringify(res)}`);
                if (res) {
                  if (res.status === 200) {
                    console.log('5. 토큰값 확인');
                    const {email, loginType, isLogin = true} = res.data.user;
                    setUserInfo(email, parsedValue.token, loginType, isLogin);
                  } else {
                    console.log('5.토큰값 다름');
                    Alert.alert('토큰이 만료되었습니다.');
                  }
                  // setUserReducer();
                } else {
                  console.log(`4.res 데이터없음`);
                }
              })
              .catch(e => console.log(`verify token api error : ${e}`));
          } else {
            console.log('3.토큰없음');
            Alert.alert('로그인이 필요합니다');
          }
        }
      })
      .catch(() => {});
  };

  const logout = (): void => {
    AsyncStorage.removeItem('@loginInfo');
    console.log('토큰삭제 : ', AsyncStorage.getItem('@loginInfo'));

    setUserReducer(initialState);
  };

  return (
    <UserContext.Provider
      value={{
        setUserInfo,
        getUserInfo,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
