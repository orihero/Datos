import {useNavigation} from '@react-navigation/native';
import Header from 'components/Header';
import RN from 'components/RN';
import React from 'react';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import {COLORS} from 'shared/constants/colors';
import {normalizeWidth} from 'shared/utils/dimensions';
const HeaderView = () => {
  const navigation = useNavigation();
  return (
    <Header
      containerStyle={styles.header}
      LeftHeader={
        <RN.TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={24} color={COLORS.white} />
        </RN.TouchableOpacity>
      }
    />
  );
};

export default HeaderView;

const styles = RN.StyleSheet.create({
  header: {
    paddingHorizontal: normalizeWidth(30),
    paddingBottom: 0,
  },
  iconButton: {
    backgroundColor: COLORS.lightGray2,
    width: normalizeWidth(54),
    aspectRatio: 1,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
