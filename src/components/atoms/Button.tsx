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
};

export const Button = ({
  children,
  onPress,
  disabled,
  style,
  size,
  round,
}: ButtonProps) => {
  return (
    <ButtonStyled
      onPress={onPress ? () => onPress() : undefined}
      disabled={disabled}
      size={size}
      style={style}
      round={round}>
      <Text
        style={{
          textAlign: 'center',
          fontSize:
            size === 'small'
              ? Theme._WIDTH / 24
              : Theme._WIDTH / 18,
          color: 'white',
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
      : props.round === true
      ? '60%'
      : `${Theme._HEIGHT / 15}px`};
  background-color: ${(props: ButtonProps) =>
    props.disabled ? '#E2E1E1' : Theme.color.blue};
  border-radius: ${(props: ButtonProps) =>
    props.round ? '20px' : '0px'};
  /* border-radius: 20px; */
  border: 2px solid white;
  justify-content: center;
`;
