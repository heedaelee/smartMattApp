/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleProp, Text, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import Theme from '~/lib/Theme';

type ButtonProps = {
  children: any;
  onPress?: (any?: any) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  size?: 'small';
  round?: boolean;
  disabledRound?: boolean;
};

const disabledColor = '#dfdcdc';
export const Button = ({
  children,
  onPress,
  disabled,
  style,
  size,
  round,
  disabledRound,
}: ButtonProps) => {
  //Default value
  let textColor = 'white';
  let fontSize = Theme._WIDTH / 18;
  console.log(`props.disabledRound : ${disabledRound}`);

  if (disabledRound) {
    textColor = disabledColor;
  }
  if (size) {
    if (size === 'small') {
      fontSize = Theme._WIDTH / 24;
    }
  }

  return (
    <ButtonStyled
      onPress={onPress ? () => onPress() : undefined}
      disabled={disabled}
      size={size}
      style={style}
      round={round}
      disabledRound={disabledRound}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: fontSize,
          color: textColor,
          fontFamily: 'SpoqaHanSansNeo-Medium',
        }}>
        {children}
      </Text>
    </ButtonStyled>
  );
};

const ButtonStyled = styled.TouchableOpacity`
  width: ${(props: ButtonProps) =>
    props.size === 'small'
      ? `${Theme._HEIGHT / 8}px`
      : '100%'};
  height: ${(props: ButtonProps) =>
    props.size === 'small'
      ? `${Theme._HEIGHT / 18}px`
      : props.round && props.size === 'small'
      ? '60%'
      : `${Theme._HEIGHT / 15}px`};
  background-color: ${(props: ButtonProps) =>
    props.disabled ? disabledColor : Theme.color.blue};
  border-radius: ${(props: ButtonProps) =>
    props.round || props.disabledRound ? '20px' : '0px'};
  /* border-radius: 20px; */
  border: ${(props: ButtonProps) =>
    props.disabledRound
      ? '2px solid #dfdcdc'
      : props.round
      ? '2px solid white'
      : 'none'};
  justify-content: center;
`;
