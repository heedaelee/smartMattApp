/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
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
  useEffect(() => {
    if (setValidationToggle) {
      if (state.indexOf('@') !== -1 || state.length >= 7) {
      }
      setValidationToggle(true);
    }
  });

  switch (type) {
    case 'email': {
      console.log(typeof state);
      if (
        state !== '' &&
        (state.indexOf('@') === -1 || state.length < 7)
      ) {
        return (
          <ErrorText>
            메일형식에 맞게 작성해주세요
          </ErrorText>
        );
      }
      if (state.indexOf('@') !== -1 || state.length >= 7) {
        // setValidationToggle && setValidationToggle();
        console.log(
          `호출됨?  state: ${state} validationState : ${validationState} `,
        );
        return <></>;
      }
    }
  }

  // NOTE: switch 변수 outside에 return 뭐라도 해줘야 undefined가 return이 안됨
  return <></>;
};
