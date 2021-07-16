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

  const setUserInfo: UserContext['setUserInfo'] = (
    email,
    loginType,
    isAutoLogin,
    token,
  ) => {
    try {
      AsyncStorage.setItem(
        '@loginInfo',
        JSON.stringify({
          email: email,
          loginType: loginType,
          isAutoLogin: isAutoLogin,
          //나중에 api 통신후..
          token: token,
        }),
      );

      /* user Data가 있을시 set to Redux */
      //  setUserReducer(value);
    } catch (e) {
      console.log(`error ${e}`);
    }
  };

  const getUserInfo = (): void => {
    console.log('1.getUserInfo 호출됨');
    AsyncStorage.getItem('@loginInfo')
      .then(value => {
        if (value) {
          console.log(`2.getUserInfo()에서 value 값 : ${value} `);
          const parsedValue = JSON.parse(value);
          if (parsedValue.token) {
            console.log(`3.token 존재`);
            Axios.get(NODE_API + Auth.VERIFY_TOKEN_API, jsonHeader)
              .then(res => {
                console.log(`4.VERIFY_TOKEN_API 호출후 res값 ${JSON.stringify(res)}`);
                if (res) {
                  setUserReducer();
                } else {
                  console.log(`4.res 데이터없음`);
                }
              })
              .catch(e => console.log(`verify token api error : ${e}`));
          } else {
            Alert.alert('토큰이 만료되었습니다.');
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
