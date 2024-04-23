import RN from 'components/RN';
import React from 'react';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';

export function Button({
  title,
  onPress,
  disabled,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}) {
  return (
    <RN.TouchableOpacity
      disabled={!!disabled}
      onPress={onPress}
      activeOpacity={0.5}
      style={[styles.button, !!disabled && styles.buttonDisabled]}>
      <RN.Text style={styles.buttonText}>{title}</RN.Text>
    </RN.TouchableOpacity>
  );
}

const styles = RN.StyleSheet.create({
  button: {
    backgroundColor: COLORS.blue,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 4,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FontFamily.Medium,
    color: COLORS.white,
  },
});
