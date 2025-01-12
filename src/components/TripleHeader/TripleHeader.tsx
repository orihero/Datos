import {User} from '@types';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import * as React from 'react';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import SearchIcon from 'shared/assets/icons/SearchIcon';
import {COLORS} from 'shared/constants/colors';
import {useAppViewInsets} from 'shared/hooks/useAppViewInsets';
import NavigationService from 'shared/navigation/NavigationService';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

interface Props {
  title: string;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  onPressRight?: () => void;
}

const TripleHeader: React.FC<Props> = ({
  title,
  leftItem,
  rightItem,
  onPressRight,
}) => {
  const {paddingTop} = useAppViewInsets();
  const height = React.useMemo(
    () => normalizeHeight(30) + paddingTop,
    [paddingTop],
  );

  const goBackHandle = () => {
    NavigationService.goBack();
  };

  return (
    <RN.View style={[styles.header, {paddingTop: height}]}>
      {leftItem && (
        <RN.TouchableOpacity style={styles.arrowBack} onPress={goBackHandle}>
          {leftItem}
        </RN.TouchableOpacity>
      )}
      <RN.Text color={COLORS.white} size="h1">
        {title}
      </RN.Text>
      {rightItem && (
        <RN.TouchableOpacity style={styles.searchIcon} onPress={onPressRight}>
          {rightItem}
        </RN.TouchableOpacity>
      )}
    </RN.View>
  );
};

export default observer(TripleHeader);

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
  arrowBack: {
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
  searchIcon: {
    backgroundColor: COLORS.lightGray,
    width: normalizeWidth(40),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: normalizeWidth(15),
    borderRadius: 40,
    bottom: normalizeHeight(10),
  },
  nextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: normalizeWidth(15),
    bottom: normalizeHeight(20),
  },
});
