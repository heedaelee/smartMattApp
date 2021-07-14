/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {ErrorText} from '~/components/atoms/Text';
import Theme from './Theme';

interface ValidationProps {
  type: string;
  state: string;
  state2?: string;
  validationState?: boolean;
  setValidationToggle?: (active: boolean) => void;
  checkedExist?: string;
  setCheckedExist?: (active: string) => void;
  errorTextStyle?: StyleProp<TextStyle>;
}

export const Validation = ({
  type,
  state,
  state2,
  validationState,
  setValidationToggle,
  checkedExist,
  setCheckedExist,
  errorTextStyle,
}: ValidationProps): any | undefined => {
  //changeState 만든 이유 : Cannot update a component (`SignUp`) while rendering a different component (`Validation`).
  //위 에러 땜에. useEffect()를 만들어줘서 setValidationToggle()을 해줘야지 switch 내부문에서 setValidationToggle(true)
  //을 하면 훅 에러 뜸
  const [chanegState, setChangeState] = useState(false);
  // console.log('vali 호출')

  useEffect(() => {
    if (setValidationToggle) {
      // 유효성 체크 조건이 true될때 (= validationStat을 true로)
      if (chanegState && !validationState) {
        console.log(`validationState가 ${validationState} 일때
      -> true로`);
        setValidationToggle(true);
      }

      // 유효성 체크 조건이 true에서 false될때 (= validationState을 false로)
      if (!chanegState && validationState) {
        console.log(`validationState가 ${validationState} 일때
      -> false로 `);
        //만약 중복 체크시 중복값 존재시, 다시 타이핑 하면 중복체크stat를 검사전 코드로 초기화시켜줘야 함
        if (checkedExist === 'fail' && setCheckedExist) {
          console.log('setCheckedExist()호출');
          setCheckedExist('');
        }
        setValidationToggle(false);
      }
    }
  }, [chanegState]);

  switch (type) {
    case 'email': {
      //불만족
      if (state !== '' && (state.indexOf('@') === -1 || state.length < 7)) {
        if (chanegState) {
          setChangeState(false);
        }
        return <ErrorText>메일형식에 맞게 작성해주세요</ErrorText>;
      }
      //만족
      if (!chanegState) {
        setChangeState(true);
      }

      //불만족 : 이메일 중복체크 후 중복일때
      switch (checkedExist) {
        case '': {
          return <ErrorText>이메일 중복 확인을 해주세요</ErrorText>;
        }
        case 'fail': {
          return <ErrorText>이미 존재하는 이메일입니다.</ErrorText>;
        }
        case 'success': {
          return (
            <ErrorText color={Theme.color.green}>사용가능한 이메일입니다.</ErrorText>
          );
        }
      }

      return <></>;
    }
    case 'password': {
      const password = state;

      const num = password.search(/[0-9]/g);
      const eng = password.search(/[a-z]/gi);
      const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

      //불만족
      if (password.length < 8 || password.length > 20) {
        if (chanegState) {
          setChangeState(false);
        }
        return <ErrorText>8자리 ~ 20자리 이내로 입력해주세요:)</ErrorText>;
      }
      if (password.search(/₩s/) !== -1) {
        return <ErrorText>공백없이 입력해주세요:)</ErrorText>;
      }
      if (num < 0 || eng < 0 || spe < 0) {
        return <ErrorText>영문, 숫자, 특수문자를 혼합해 주세요:)</ErrorText>;
      }
      //만족
      if (!chanegState) {
        setChangeState(true);
      }

      return <></>;
    }
    case 'password2': {
      //second pw user typed
      const password2 = state;
      //first pw user typed
      const paswword = state2;
      //불만족
      if (paswword !== password2) {
        if (chanegState) {
          setChangeState(false);
        }
        return <ErrorText>비밀번호가 동일한지 다시한번 확인해 주세요:)</ErrorText>;
      } else {
        if (!chanegState) {
          setChangeState(true);
        }
        return <></>;
      }
    }
    case 'phone': {
      let num = state.split('-').join('');
      //1. 모두 숫자인지 체크
      const checkNum = Number.isInteger(Number(num));
      //2. 앞 세자리가 010으로 시작하는지 체크
      const checkStartNum = num.slice(0, 3) === '010' ? true : false;
      //3. 010을 제외한 나머지 숫자가 7 혹은 8자리인지 체크
      const checkLength =
        num.slice(3).length === 7 || num.slice(3).length === 8 ? true : false;
      if (!checkNum || !checkStartNum || !checkLength) {
        if (chanegState) {
          setChangeState(false);
        }
        return <ErrorText>휴대폰 번호를 확인해 주세요:)</ErrorText>;
      } else {
        if (!chanegState) {
          setChangeState(true);
        }

        //불만족 : 이메일 중복체크 후 중복일때
        switch (checkedExist) {
          case '': {
            return <ErrorText>인증번호 전송 버튼을 눌러주세요.</ErrorText>;
          }
          case 'fail': {
            return <ErrorText>이미 존재하는 번호입니다.</ErrorText>;
          }
          case 'success': {
            return (
              <ErrorText color={Theme.color.green}>사용가능한 휴대폰입니다.</ErrorText>
            );
          }
        }

        return <></>;
      }
    }
    case 'phoneAuth': {
      const phoneAuth = state;

      const num = phoneAuth.search(/\d{4}/g);
      if (num < 0) {
        if (chanegState) {
          setChangeState(false);
        }
        return <ErrorText>인증번호를 확인해 주세요:)</ErrorText>;
      } else {
        if (!chanegState) {
          setChangeState(true);
        }
        return <></>;
      }
    }
    case 'ssid': {
      console.log(`state : ${state} type ${type}`);
      const ssid = state;
      if (ssid.length >= 20) {
        if (chanegState) {
          setChangeState(false);
        }
        return <ErrorText style={errorTextStyle}>20자 이내로 입력해주세요:)</ErrorText>;
      } else {
        if (!chanegState) {
          setChangeState(true);
        }
        return <></>;
      }
    }
    case 'ssidPassword': {
      const ssidPassword = state;
      if (ssidPassword.length < 8 || ssidPassword.length >= 20) {
        console.log(ssidPassword.length);
        if (chanegState) {
          setChangeState(false);
        }
        return <ErrorText style={errorTextStyle}>8~20자 내로 입력해주세요:)</ErrorText>;
      } else {
        if (!chanegState) {
          setChangeState(true);
        }
        return <></>;
      }
    }
    case 'patientName': {
      const patientName = state;
      if (patientName.length > 10) {
        if (chanegState) {
          setChangeState(false);
        }
        return <ErrorText style={errorTextStyle}>10자 내로 입력해주세요:)</ErrorText>;
      } else {
        if (!chanegState) {
          setChangeState(true);
        }
        return <></>;
      }
    }
    case 'deviceCode': {
      const deviceCode = state;
      if (deviceCode.length !== 6) {
        if (chanegState) {
          setChangeState(false);
        }
        return <ErrorText style={errorTextStyle}>기기코드는 6자리입니다</ErrorText>;
      } else {
        if (!chanegState) {
          setChangeState(true);
        }
        return <></>;
      }
    }
    case 'patientCondition': {
      const patientCondition = state;
      if (patientCondition.length > 150) {
        if (chanegState) {
          setChangeState(false);
        }
        return <ErrorText style={errorTextStyle}>150자 이하로 작성해주세요</ErrorText>;
      } else {
        if (!chanegState) {
          setChangeState(true);
        }
        return <></>;
      }
    }

    case 'name': {
      const userName = state;
      if (userName.length > 10) {
        if (chanegState) {
          setChangeState(false);
        }
        return <ErrorText style={errorTextStyle}>10자 이하로 작성해주세요</ErrorText>;
      } else {
        if (!chanegState) {
          setChangeState(true);
        }
        return <></>;
      }
    }

    // case '무명': {

    // }
    default:
      // NOTE: switch 변수 outside에 return 뭐라도 해줘야 undefined가 return이 안됨
      return <></>;
  }
};
