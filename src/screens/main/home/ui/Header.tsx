import Header from 'components/Header';
import RN from 'components/RN';
import React from 'react';
import BellRegularIcon from 'shared/assets/icons/BellRegularIcon';
import PlusIcon from 'shared/assets/icons/PlusIcon';
import {LogoSvgImage} from 'shared/assets/svg-images';
import {COLORS} from 'shared/constants/colors';
import {normalizeWidth} from 'shared/utils/dimensions';
export default () => (
  <Header
    containerStyle={styles.header}
    LeftHeader={
      <RN.View pt={10}>
        <LogoSvgImage width={normalizeWidth(170)} />
      </RN.View>
    }
    RightHeader={
      <RN.View fd={'row'} ai={'center'} g={11}>
        <RN.TouchableOpacity style={styles.iconButton}>
          <PlusIcon size={24} color={COLORS.white} />
        </RN.TouchableOpacity>
        <RN.TouchableOpacity style={styles.iconButton}>
          <BellRegularIcon size={24} color={COLORS.white} />
        </RN.TouchableOpacity>
      </RN.View>
    }
  />
);

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
