import RN from 'components/RN';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';

export function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <RN.TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      activeOpacity={0.5}
      style={[styles.button, disabled && styles.buttonDisabled]}>
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.white} />
      ) : (
        <RN.Text style={styles.buttonText}>{title}</RN.Text>
      )}
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
    borderRadius: 16,
    height: 50,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: FontFamily.Medium,
    color: COLORS.white,
  },
});
