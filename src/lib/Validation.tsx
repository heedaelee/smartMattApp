/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {ErrorText} from '~/components/atoms/Text';

interface ValidationProps {
  type: string;
  state: string;
  validationState?: boolean;
  setValidationToggle?: (active: boolean) => void;
}

export const Validation = ({
  type,
  state,
  validationState,
  setValidationToggle,
}: ValidationProps): any | undefined => {
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

      // 유효성 체크 조건이 true에서 false될때 (= validationStat을 false로)
      if (!chanegState && validationState) {
        console.log(`validationState가 ${validationState} 일때
      -> false로 `);
        setValidationToggle(false);
      }
    }
  }, [chanegState]);

  switch (type) {
    case 'email': {
      //불만족
      if (
        state !== '' &&
        (state.indexOf('@') === -1 || state.length < 7)
      ) {
        if (chanegState) {
          setChangeState(false);
        }
        return (
          <ErrorText>
            메일형식에 맞게 작성해주세요
          </ErrorText>
        );
      }
      //만족
      if (!chanegState) {
        setChangeState(true);
      }
      // console.log(
      //   `호출됨?  state: ${state} validationState : ${validationState} `,
      // );
      return <></>;
    }
    case 'password': {
      const password = state;

      const num = password.search(/[0-9]/g);
      const eng = password.search(/[a-z]/gi);
      const spe = password.search(
        /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi,
      );

      //불만족
      if (password.length < 8 || password.length > 20) {
        if (chanegState) {
          setChangeState(false);
        }
        return (
          <ErrorText>
            8자리 ~ 20자리 이내로 입력해주세요:)
          </ErrorText>
        );
      }
      if (password.search(/₩s/) !== -1) {
        return (
          <ErrorText>공백없이 입력해주세요:)</ErrorText>
        );
      }
      if (num < 0 || eng < 0 || spe < 0) {
        return (
          <ErrorText>
            영문, 숫자, 특수문자를 혼합해 주세요:)
          </ErrorText>
        );
      }
      //만족
      if (!chanegState) {
        setChangeState(true);
      }
      // console.log(
      //   `호출됨?  state: ${state} validationState : ${validationState} `,
      // );
      return <></>;
    }
    default:
      // NOTE: switch 변수 outside에 return 뭐라도 해줘야 undefined가 return이 안됨
      return <></>;
  }
};
