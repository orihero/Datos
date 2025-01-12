import RN from 'components/RN';
import * as React from 'react';
import {COLORS} from 'shared/constants/colors';
import {useAppViewInsets} from 'shared/hooks/useAppViewInsets';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

interface Props {}

const Header: React.FC<Props> = ({}) => {
  const {paddingTop} = useAppViewInsets();
  const height = React.useMemo(
    () => normalizeHeight(30) + paddingTop,
    [paddingTop],
  );

  return (
    <RN.View style={[styles.header, {paddingTop: height}]}>
      <RN.Text color={COLORS.white} size="h1">
        Explore
      </RN.Text>
    </RN.View>
  );
};

export default Header;

const styles = RN.StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: normalizeWidth(30),
    backgroundColor: COLORS.dargGray,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
