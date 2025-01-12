import Header from 'components/Header';
import RN from 'components/RN';
import React from 'react';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import LogoutIcon from 'shared/assets/icons/LogoutIcon';
import {COLORS} from 'shared/constants/colors';
import {normalizeWidth} from 'shared/utils/dimensions';
import {useNavigation} from '@react-navigation/native';
import {useRootStore} from 'shared/store/hooks/useRootStore';

export default () => {
  const {goBack} = useNavigation();
  const {visible} = useRootStore();

  return (
    <Header
      containerStyle={styles.header}
      LeftHeader={
        <RN.TouchableOpacity style={styles.iconButton} onPress={goBack}>
          <ArrowLeftIcon size={24} color={COLORS.white} />
        </RN.TouchableOpacity>
      }
      RightHeader={
        <RN.TouchableOpacity
          style={styles.iconButton}
          onPress={() => visible.show('logoutConfirmation')}>
          <LogoutIcon size={24} color={COLORS.white} />
        </RN.TouchableOpacity>
      }
    />
  );
};

const styles = RN.StyleSheet.create({
  header: {
    paddingHorizontal: normalizeWidth(10),
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
