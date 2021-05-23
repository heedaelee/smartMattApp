/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components/native';
import {Button} from '../atoms/Button';

type BlePageRoundButtonRowProps = {
  goToEditPage: () => void;
  submitToMatt: () => void;
  isBleConn: boolean;
};

export const BlePageRoundButtonRow = ({
  goToEditPage,
  isBleConn,
  submitToMatt,
}: BlePageRoundButtonRowProps) => {
  return (
    <ButtonContainer>
      <DivisionView style={{marginRight: 2.5}}>
        {console.log(`isBleConn : ${isBleConn}`)}
        {isBleConn ? (
          /* 연결됨 */
          <Button onPress={goToEditPage} round={true}>
            수정하기
          </Button>
        ) : (
          /* 연결안됨 */
          <Button disabledRound={true}>수정하기</Button>
        )}
      </DivisionView>
      <DivisionView style={{marginLeft: 2.5}}>
        {isBleConn ? (
          <Button round={true} onPress={submitToMatt}>
            확인
          </Button>
        ) : (
          <Button disabledRound={true}>확인</Button>
        )}
      </DivisionView>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.View`
  flex: 1;
  /* border: 1px;
  border-color: white; */
  flex-direction: row;
  align-items: center;
`;
const DivisionView = styled.View`
  flex: 1;
  /* border: 1px;
  border-color: white; */
`;
