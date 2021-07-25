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
  isEdit: boolean;
  isSsid: boolean;
  isSsidPassword: boolean;
};

export const BlePageRoundButtonRow = ({
  goToEditPage,
  isBleConn,
  submitToMatt,
  isEdit,
  isSsid,
  isSsidPassword,
}: BlePageRoundButtonRowProps) => {
  return (
    <ButtonContainer>
      {!isEdit ? (
        // 1. 상세 페이지
        <>
          <DivisionView style={{marginRight: 2.5}}>
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
                연결하기
              </Button>
            ) : (
              <Button disabledRound={true}>연결하기</Button>
            )}
          </DivisionView>
        </>
      ) : // 2. 수정 페이지
      isSsid && isSsidPassword ? (
        <Button round={true} onPress={submitToMatt}>
          연결하기
        </Button>
      ) : (
        <Button round={true} disabledRound={true}>
          연결하기
        </Button>
      )}
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
