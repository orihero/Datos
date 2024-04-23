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
}

export const PhoneInput: FC<PhoneInputProps> = ({
  selectedCountry,
  inputValue,
  onChangeCountry,
  onChangeInputValue,
}) => {
  return (
    <RN.View>
      <RNPhoneInput
        value={inputValue}
        onChangePhoneNumber={onChangeInputValue}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={onChangeCountry}
        placeholderTextColor={addAlpha(COLORS.black, 0.6)}
        defaultCountry="UZ"
        customCaret={<ArrowDownIcon color={COLORS.black} size={22} />}
        placeholder="Enter number!"
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
    columnGap: 8,
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
    color: COLORS.black,
    paddingLeft: 26,
    paddingRight: 10,
    zIndex: 1,
    lineHeight: 18,
  },
  input: {
    fontFamily: FontFamily.Regular,
    fontSize: 16,
    color: COLORS.black,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderWidth: 1,
    borderColor: addAlpha(COLORS.black, 0.2),
    backgroundColor: COLORS.white,
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
    borderRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderWidth: 1,
    borderColor: addAlpha(COLORS.black, 0.2),
    backgroundColor: COLORS.white,
    zIndex: 2,
  },
  codeContainer: {},
  arrowDown: {
    zIndex: 2,
  },
});
