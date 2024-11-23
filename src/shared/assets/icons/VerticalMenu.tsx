import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';
import {IIconProps} from '../../../@types';
import {COLORS} from '../../constants/colors';

const VerticalMenuIcon = ({size, color}: IIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={6} r={2} fill={color ?? COLORS.black} />
      <Circle cx={12} cy={12} r={2} fill={color ?? COLORS.black} />
      <Circle cx={12} cy={18} r={2} fill={color ?? COLORS.black} />
    </Svg>
  );
};

export default VerticalMenuIcon;
