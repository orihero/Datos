import RN from 'components/RN';
import {COLORS} from 'constants/colors';
import {useAppViewInsets} from 'hooks/useAppViewInsets';
import React, {FC, ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

interface HeaderProps {
  LeftHeader?: ReactNode;
  RightHeader?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}
const Header: FC<HeaderProps> = ({LeftHeader, RightHeader, containerStyle}) => {
  const {paddingTop} = useAppViewInsets();
  return (
    <RN.View style={[styles.container, {paddingTop}, containerStyle]}>
      {LeftHeader}
      {RightHeader}
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    height: 100,
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
