import RN from 'components/RN';
import React, {useMemo} from 'react';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import NavigationService from 'shared/navigation/NavigationService';
import {useAppViewInsets} from 'shared/hooks/useAppViewInsets';
import {useTranslation} from 'react-i18next';

export default () => {
  const {t} = useTranslation();
  const {paddingTop} = useAppViewInsets();
  const height = useMemo(() => normalizeHeight(30) + paddingTop, [paddingTop]);

  return (
    <RN.View style={[styles.header, {paddingTop: height}]}>
      <RN.TouchableOpacity
        style={styles.iconButton}
        onPress={() => NavigationService.goBack()}>
        <ArrowLeftIcon size={24} color={COLORS.white} />
      </RN.TouchableOpacity>
      <RN.Text color={COLORS.white} size="h1">
        {t('my_posts')}
      </RN.Text>
      <RN.TouchableOpacity
        style={styles.iconButton}
        onPress={() => NavigationService.goBack()}>
        <ArrowLeftIcon size={24} color={COLORS.white} />
      </RN.TouchableOpacity>
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: normalizeWidth(30),
    backgroundColor: COLORS.dargGray,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconButton: {
    backgroundColor: COLORS.lightGray,
    width: normalizeWidth(40),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: normalizeWidth(15),
    borderRadius: 40,
    bottom: normalizeHeight(20),
  },
  nextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: normalizeWidth(15),
    bottom: normalizeHeight(20),
  },
});
