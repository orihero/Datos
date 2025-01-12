import {TextInput} from 'components/Inputs/TextInput';
import RN from 'components/RN';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, StyleSheet} from 'react-native';
import FilterIcon from 'shared/assets/icons/FilterIcon';
import SearchIcon from 'shared/assets/icons/SearchIcon';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

interface Props {
  value: string;
  setSearchHandle: (key: string) => void;
  onPressFilter?: () => void;
}

const SearchInput: React.FC<Props> = ({
  value,
  setSearchHandle,
  onPressFilter,
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <SearchIcon size={24} color={COLORS.textGray} />
      <RN.TextInput
        placeholder={`${t('search')}`}
        placeholderTextColor={COLORS.textGray}
        style={styles.input}
        onChangeText={setSearchHandle}
        value={value}
      />
      <RN.TouchableOpacity onPress={onPressFilter}>
        <FilterIcon size={28} color={COLORS.white} />
      </RN.TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 15,
    paddingHorizontal: normalizeWidth(10),
  },
  input: {
    width: '85%',
    paddingRight: normalizeWidth(10),
    paddingVertical: normalizeHeight(15),
    fontSize: normalizeHeight(18),
    color: COLORS.white,
  },
});
