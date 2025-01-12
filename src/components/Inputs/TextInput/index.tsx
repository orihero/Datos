import RN from 'components/RN';
import React, {FC, ReactNode} from 'react';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {COLORS} from 'shared/constants/colors';
import {addAlpha} from 'shared/utils/color';

interface Props {
  LeftElement?: ReactNode;
  RightElement?: ReactNode;
  numberOfLines?: number;
  value: string;
  placeholder?: string;
  onChangeText(value: string): void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  placeholderTextColor?: string;
}

export const TextInput: FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  containerStyle,
  inputStyle,
  LeftElement,
  RightElement,
  placeholderTextColor,
  numberOfLines = 1,
}) => {
  return (
    <RN.View style={[styles.container, containerStyle]}>
      {LeftElement}
      <RN.TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : COLORS.textGray
        }
        style={[styles.input, inputStyle]}
        autoCapitalize="none"
        autoCorrect={false}
        numberOfLines={numberOfLines}
      />
      {RightElement}
    </RN.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: addAlpha(COLORS.black, 0.2),
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
  },
  input: {
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
    paddingVertical: 14,
  },
});
