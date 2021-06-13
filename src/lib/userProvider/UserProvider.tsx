/* eslint-disable prettier/prettier */
import React, {createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoggedUser} from '~/hooks/useReduce';
import {initialState} from '~/modules/user/user';

const defaultContext: UserContext = {
  login: (email: string, password: string, loginType: string, isAutoLogin: boolean) => {},
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
  //TODO:APi 서버 통해 Token 및 user정보 받아오기

  useEffect(() => {
    getUserInfo();
  }, []);

  const [userState, setUserReducer] = useLoggedUser();

  const login = (
    email: string,
    password: string,
    loginType: string,
    isAutoLogin: boolean,
  ): void => {
    try {
      AsyncStorage.setItem(
        '@loginInfo',
        JSON.stringify({
          email: email,
          password: password,
          loginType: loginType,
          isAutoLogin: isAutoLogin,
          //나중에 api 통신후..
          // token: res.data.token,
        }),
      );

      /* user Data가 있을시 set to Redux */
      //  setUserReducer(value);
    } catch (e) {
      console.log(`error ${e}`);
    }
  };

  const getUserInfo = (): void => {
    AsyncStorage.getItem('@loginInfo')
      .then(value => {
        if (value) {
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
        login,
        getUserInfo,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
