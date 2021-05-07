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
      //만족
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
      //불만족
      if (state.indexOf('@') !== -1 || state.length >= 7) {
        // setValidationToggle && setValidationToggle();
        if (!chanegState) {
          setChangeState(true);
        }
        // console.log(
        //   `호출됨?  state: ${state} validationState : ${validationState} `,
        // );
        return <></>;
      }
    }
  }

  // NOTE: switch 변수 outside에 return 뭐라도 해줘야 undefined가 return이 안됨
  return <></>;
};
