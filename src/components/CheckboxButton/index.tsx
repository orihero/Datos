/* eslint-disable react-native/no-inline-styles */
import RN from 'components/RN';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import CheckboxIcon from 'shared/assets/icons/CheckboxIcon';
import {COLORS} from 'shared/constants/colors';
import {addAlpha} from 'shared/utils/color';

interface CheckboxButtonProps {
  value: boolean;
  checkboxColor?: string;
}

export const CheckboxButton: FC<CheckboxButtonProps> = ({
  value,
  checkboxColor,
}) => {
  return (
    <View
      style={{
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {value ? (
        <CheckboxIcon color={checkboxColor || COLORS.white} size={24} />
      ) : (
        <RN.View style={styles.checkbox} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 24,
    backgroundColor: addAlpha(COLORS.white, 0.2),
  },
});
