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
  icon,
  outline,
  height,
  width,
  borderColor,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  outline?: boolean;
  height?: number;
  width?: any;
  borderColor?: string;
}) {
  return (
    <RN.TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      activeOpacity={0.5}
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        outline ? styles.buttonOutline : styles.buttonPrimary,
        {
          height: height ? height : 50,
          width: width ? width : '100%',
          borderColor: borderColor ? borderColor : COLORS.blue,
        },
      ]}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={outline ? COLORS.blue : COLORS.white}
        />
      ) : (
        <RN.Text
          style={[
            styles.buttonText,
            {color: outline ? COLORS.blue : COLORS.white},
          ]}>
          {title}
        </RN.Text>
      )}
      {icon && !loading && icon}
    </RN.TouchableOpacity>
  );
}

const styles = RN.StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 16,
    gap: 10,
  },
  buttonPrimary: {
    backgroundColor: COLORS.blue,
  },
  buttonOutline: {
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
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
