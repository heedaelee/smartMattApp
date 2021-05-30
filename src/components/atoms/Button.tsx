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
  let opacity = 1;

  if (disabledRound) {
    textColor = disabledColor;
    opacity = 0.8;
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
          opacity: opacity,
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
      ? '2px solid #a4a4a4'
      : props.round
      ? '2px solid white'
      : 'none'};
  justify-content: center;
`;

export const CircleButton = ({
  children,
  onPress,
  style,
}: ButtonProps) => {
  //Default value
  let textColor = 'white';
  let fontSize = 30;
  let opacity = 1;

  return (
    <CircleButtonStyled
      onPress={onPress ? () => onPress() : undefined}
      style={style}>
      <Text
        style={{
          fontSize: fontSize,
          color: textColor,
          fontFamily: 'SpoqaHanSansNeo-Medium',
          opacity: opacity,
        }}>
        {children}
      </Text>
    </CircleButtonStyled>
  );
};

const CircleButtonStyled = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: ${Theme.color.blue};
  border-radius: 40px;
  justify-content: flex-end;
  top: 450px;
  left: 280px;
`;
