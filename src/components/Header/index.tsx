import RN from 'components/RN';
import {COLORS} from 'shared/constants/colors';
import {useAppViewInsets} from 'shared/hooks/useAppViewInsets';
import React, {FC, ReactNode, useMemo} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {normalizeHeight} from 'shared/utils/dimensions';

interface HeaderProps {
  LeftHeader?: ReactNode;
  RightHeader?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}
const Header: FC<HeaderProps> = ({LeftHeader, RightHeader, containerStyle}) => {
  const {paddingTop} = useAppViewInsets();
  const height = useMemo(() => normalizeHeight(90) + paddingTop, [paddingTop]);
  return (
    <RN.View style={[styles.container, {paddingTop, height}, containerStyle]}>
      {LeftHeader}
      {RightHeader}
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: COLORS.dargGray,
    paddingBottom: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Header;
