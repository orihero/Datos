import React from 'react';
import {
  KeyboardAvoidingView as View,
  Platform,
  StyleSheet,
  KeyboardAvoidingViewProps,
} from 'react-native';
import RN from '../RN';
import {COLORS} from '../../shared/constants/colors';

export const KeyboardAvoidingView = ({
  children,
  style,
  ...props
}: KeyboardAvoidingViewProps) => {
  return (
    <View
      behavior={RN.Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={Platform.OS === 'android' ? 10 : 0}
      style={[styles.container, style]}
      {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.transparent,
  },
});
