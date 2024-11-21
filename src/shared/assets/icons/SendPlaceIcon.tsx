import * as React from 'react';
import Svg, {Polygon} from 'react-native-svg';
import {IIconProps} from '../../../@types';
import {COLORS} from '../../constants/colors';

const SendPlaneIcon = ({size, color}: IIconProps) => {
  return (
    <Svg
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill={color || COLORS.skyPurpil}>
      <Polygon points="3 12 8.61 14.992 17 8 9 17.455 9 21 12.164 16.887 18 20 21 3 3 12" />
    </Svg>
  );
};

export default SendPlaneIcon;
