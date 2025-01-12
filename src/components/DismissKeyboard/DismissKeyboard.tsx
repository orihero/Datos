import RN from 'components/RN';
import React from 'react';
import {Keyboard} from 'react-native';

const DismissKeyboard = ({children}: {children: any}) => (
  <RN.TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    {children}
  </RN.TouchableWithoutFeedback>
);

export default DismissKeyboard;
