/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const DownKeyboard = ({children}: any) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default DownKeyboard;
