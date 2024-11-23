import RN from 'components/RN';
import React, {useMemo} from 'react';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import {COLORS} from 'shared/constants/colors';
import {useAppViewInsets} from 'shared/hooks/useAppViewInsets';
import NavigationService from 'shared/navigation/NavigationService';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

export default ({title}: {title: string}) => {
  const {paddingTop} = useAppViewInsets();
  const height = useMemo(() => normalizeHeight(25) + paddingTop, [paddingTop]);
  return (
    <RN.View style={[styles.header, {paddingTop: height}]}>
      <RN.TouchableOpacity
        style={styles.iconButton}
        onPress={() => NavigationService.goBack()}>
        <ArrowLeftIcon size={24} color={COLORS.black} />
      </RN.TouchableOpacity>
      <RN.Text color={COLORS.white} size="h1">
        {title}
      </RN.Text>
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: normalizeWidth(30),
    paddingBottom: 5,
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
  },
});
