import React from 'react';
import RN from 'components/RN';
import GalleryIcon from 'shared/assets/icons/Gallery';
import LinkIcon from 'shared/assets/icons/LinkIcon';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

export default () => {
  return (
    <RN.View style={styles.container}>
      <RN.TouchableOpacity>
        <LinkIcon color={COLORS.textGray} />
      </RN.TouchableOpacity>
      <RN.TouchableOpacity>
        <GalleryIcon color={COLORS.textGray} />
      </RN.TouchableOpacity>
    </RN.View>
  );
};
const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: normalizeWidth(30),
    paddingVertical: normalizeHeight(30),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  nextBtn: {
    width: '20%',
  },
});
