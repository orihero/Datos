import Header from 'components/Header';
import RN from 'components/RN';
import React from 'react';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import SettingsIcon from 'shared/assets/icons/SettingsIcon';
import ChatIcon from 'shared/assets/icons/ChatIcon';
import {COLORS} from 'shared/constants/colors';
import {normalizeWidth} from 'shared/utils/dimensions';
import {HOME_STACK} from 'shared/navigation/routes';
import NavigationService from 'shared/navigation/NavigationService';

export default () => {
  return (
    <Header
      containerStyle={styles.header}
      LeftHeader={
        <RN.View pt={10}>
          <RN.TouchableOpacity
            style={styles.iconButton}
            onPress={() => NavigationService.goBack()}>
            <ArrowLeftIcon size={24} color={COLORS.white} />
          </RN.TouchableOpacity>
        </RN.View>
      }
      RightHeader={
        <RN.View fd={'row'} ai={'center'} g={11}>
          <RN.TouchableOpacity style={styles.iconButton}>
            <ChatIcon size={24} color={COLORS.white} />
          </RN.TouchableOpacity>
          <RN.TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              NavigationService.navigate(HOME_STACK.PROFILE_SETTINGS)
            }>
            <SettingsIcon size={24} color={COLORS.white} />
          </RN.TouchableOpacity>
        </RN.View>
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
