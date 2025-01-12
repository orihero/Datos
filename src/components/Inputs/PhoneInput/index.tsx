import React, {FC} from 'react';
import RNPhoneInput, {ICountry} from 'react-native-international-phone-number';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import {addAlpha} from 'shared/utils/color';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';
import CrossRedCircleSmallIcon from 'shared/assets/icons/CrossRedCircleSmallIcon';
import RN from 'components/RN';

export interface PhoneInputProps {
  selectedCountry: ICountry | null;
  inputValue: string;
  onChangeInputValue(value: string): void;
  onChangeCountry(country: ICountry): void;
  placeholder?: string;
}

export const PhoneInput: FC<PhoneInputProps> = ({
  selectedCountry,
  inputValue,
  onChangeCountry,
  onChangeInputValue,
  placeholder,
}) => {
  return (
    <RN.View bgColor={COLORS.black}>
      <RNPhoneInput
        value={inputValue}
        modalDisabled
        onChangePhoneNumber={onChangeInputValue}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={onChangeCountry}
        placeholderTextColor={addAlpha(COLORS.white, 0.6)}
        defaultCountry="UZ"
        customCaret={<ArrowDownIcon size={0} color={COLORS.transparent} />}
        placeholder={placeholder}
        modalStyles={{
          searchInput: styles.input,
        }}
        phoneInputStyles={{
          callingCode: styles.callingCode,
          container: styles.container,
          flagContainer: styles.flagContainer,
          flag: styles.flag,
          divider: styles.divider,
          input: styles.input,
        }}
      />

      {!!inputValue && (
        <RN.TouchableOpacity
          onPress={() => onChangeInputValue('')}
          activeOpacity={0.5}
          style={styles.crossIcon}>
          <CrossRedCircleSmallIcon color={COLORS.black} size={22} />
        </RN.TouchableOpacity>
      )}
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    borderWidth: 0,
    overflow: 'visible',
    // columnGap: 8,
  },
  crossIcon: {
    position: 'absolute',
    right: 20,
    top: 12,
    zIndex: 1,
  },
  callingCode: {
    fontFamily: FontFamily.Regular,
    fontSize: 16,
    color: COLORS.white,
    paddingLeft: 26,
    paddingRight: 1,
    zIndex: 1,
    lineHeight: 18,
  },
  input: {
    fontFamily: FontFamily.Regular,
    fontSize: 16,
    color: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.black,
  },
  flag: {
    padding: 0,
    position: 'absolute',
    zIndex: 1,
  },
  divider: {
    display: 'none',
  },
  flagContainer: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.black,
    zIndex: 2,
  },
  codeContainer: {},
});
