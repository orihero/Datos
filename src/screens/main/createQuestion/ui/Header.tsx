import RN from 'components/RN';
import React, {useMemo} from 'react';
import CrossRedCircleSmallIcon from 'shared/assets/icons/CrossRedCircleSmallIcon';
import {COLORS} from 'shared/constants/colors';
import {useAppViewInsets} from 'shared/hooks/useAppViewInsets';
import NavigationService from 'shared/navigation/NavigationService';
import {HOME_STACK} from 'shared/navigation/routes';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

export default () => {
  const {paddingTop} = useAppViewInsets();
  const height = useMemo(() => normalizeHeight(25) + paddingTop, [paddingTop]);
  return (
    <RN.View style={[styles.header, {paddingTop: height}]}>
      <RN.TouchableOpacity
        style={styles.iconButton}
        onPress={() => NavigationService.goBack()}>
        <CrossRedCircleSmallIcon size={42} />
      </RN.TouchableOpacity>
      <RN.Text color={COLORS.white} size="h1">
        New Post
      </RN.Text>
      <RN.TouchableOpacity
        style={styles.nextBtn}
        onPress={() => NavigationService.navigate(HOME_STACK.TOPICS)}>
        <RN.Text children="Next" color={COLORS.white} />
      </RN.TouchableOpacity>
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
    // backgroundColor: 'red',
  },
  iconButton: {
    width: normalizeWidth(54),
    aspectRatio: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: normalizeWidth(15),
  },
  nextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: normalizeWidth(15),
    paddingVertical: 10,
  },
});
