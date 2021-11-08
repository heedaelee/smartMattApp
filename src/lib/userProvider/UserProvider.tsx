/* eslint-disable prettier/prettier */
import React, {createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoggedUser} from '~/hooks/useReduce';
import {initialState} from '~/modules/user/user';
import Axios from 'axios';
import {NODE_API, Auth, jsonHeader} from '~/lib/apiSite/apiSite';
import {Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';

const defaultContext: UserContext = {
  setUserInfo: () => {},
  getUserInfo: (active?: any) => {},
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

  useEffect(() => {
    getUserInfo();
  },[]);

  const [userState, setUserReducer] = useLoggedUser();

  const setUserInfo: UserContext['setUserInfo'] = async (
    id,
    email,
    token,
    loginType,
    isLogin,
  ) => {
    try {
      await AsyncStorage.setItem(
        '@loginInfo',
        JSON.stringify({
          id: id,
          email: email,
          loginType: loginType,
          isLogin: isLogin,
          token: token,
        }),
      );

      /* user Data가 있을시 set to Redux */
      const storageValue = await AsyncStorage.getItem('@loginInfo');
      console.log(`저장된 @loginInfo : ${JSON.stringify(storageValue)}`);
      setUserReducer({id, email, loginType, isLogin, token});
      console.log('reduce 셋 완료');
    } catch (e) {
      console.log(`error ${e}`);
    }
  };

  //localStorage에 정보를 읽어 서버에 호출후 로그인 데이터를 받아온다. 그리고 로컬에 기입한다.
  const getUserInfo = (navigation?: StackNavigationProp<any>) => {
    console.log('1.getUserInfo 호출됨');
    AsyncStorage.getItem('@loginInfo')
      .then(value => {
        if (value) {
          console.log(`2.getUserInfo()에서 value 값 : ${value} `);
          const parsedValue = JSON.parse(value);
          if (parsedValue.token) {
            console.log(`3.token 존재, 보낼token : ${parsedValue.token}`);
            Axios.get(NODE_API + Auth.VERIFY_TOKEN_API)
              .then(res => {
                console.log(`4.VERIFY_TOKEN_API 호출후 res값 ${JSON.stringify(res)}`);
                if (res) {
                  if (res.status === 200) {
                    console.log('5. 토큰값 확인');
                    const {id, email, loginType, isLogin = true} = res.data.user;
                    setUserInfo(id, email, parsedValue.token, loginType, isLogin);
                  } else {
                    console.log('5.토큰값 다름');
                    Alert.alert('토큰이 만료되었습니다.');
                    navigation && navigation.navigate('SignIn');
                  }
                  // setUserReducer();
                } else {
                  console.log(`4.res 데이터없음`);
                }
              })
              .catch(e => console.log(`verify token api error : ${e}`));
          }
        } else {
          console.log(`2.getUserInfo()에서 value 값 없음, 값 : ${value} `);
          Alert.alert('Localstorage user 값 없음');
          navigation && navigation.navigate('SignIn');
        }
      })
      .catch(e => {
        console.log(`1.getUserInfo 호출에서 에러, 에러msg : ${JSON.stringify(e)} `);
      });
  };
  // const getUserInfo = (navigation?: StackNavigationProp<any>) => {
  //   console.log('1.getUserInfo 호출됨');
  //   AsyncStorage.getItem('@loginInfo')
  //     .then(value => {
  //       if (value) {
  //         console.log(`2.getUserInfo()에서 value 값 : ${value} `);
  //         const parsedValue = JSON.parse(value);
  //         if (parsedValue.token) {
  //           console.log(`3.token 존재, 보낼token : ${parsedValue.token}`);
  //           Axios.get(NODE_API + Auth.VERIFY_TOKEN_API, {
  //             headers: {Authorization: `Bearer ${parsedValue.token}`},
  //           })
  //             .then(res => {
  //               console.log(`4.VERIFY_TOKEN_API 호출후 res값 ${JSON.stringify(res)}`);
  //               if (res) {
  //                 if (res.status === 200) {
  //                   console.log('5. 토큰값 확인');
  //                   const {id, email, loginType, isLogin = true} = res.data.user;
  //                   setUserInfo(id, email, parsedValue.token, loginType, isLogin);
  //                 } else {
  //                   console.log('5.토큰값 다름');
  //                   Alert.alert('토큰이 만료되었습니다.');
  //                   navigation && navigation.navigate('SignIn');
  //                 }
  //                 // setUserReducer();
  //               } else {
  //                 console.log(`4.res 데이터없음`);
  //               }
  //             })
  //             .catch(e => console.log(`verify token api error : ${e}`));
  //         }
  //       } else {
  //         console.log(`2.getUserInfo()에서 value 값 없음, 값 : ${value} `);
  //         Alert.alert('Localstorage user 값 없음');
  //         navigation && navigation.navigate('SignIn');
  //       }
  //     })
  //     .catch(e => {
  //       console.log(`1.getUserInfo 호출에서 에러, 에러msg : ${JSON.stringify(e)} `);
  //     });
  // };

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
