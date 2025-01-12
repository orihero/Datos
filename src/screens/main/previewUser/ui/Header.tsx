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
  user: User;
}

const Header: React.FC<Props> = ({user}) => {
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
      <RN.TouchableOpacity style={styles.arrowBack} onPress={goBackHandle}>
        <ArrowLeftIcon size={20} color={COLORS.white} />
      </RN.TouchableOpacity>
      <RN.Text color={COLORS.white} size="h1">
        {user?.nickname}
      </RN.Text>
      <RN.TouchableOpacity style={styles.searchIcon} onPress={goBackHandle}>
        <SearchIcon size={24} color={COLORS.white} />
      </RN.TouchableOpacity>
    </RN.View>
  );
};

export default observer(Header);

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
    bottom: normalizeHeight(20),
  },
});
