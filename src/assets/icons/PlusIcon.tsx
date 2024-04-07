import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IIconProps} from '../../@types';
import {COLORS} from '../../constants/colors';

const PlusIcon = ({size, color}: IIconProps) => {
  return (
    <Svg
      height={size}
      width={size}
      viewBox="0 -960 960 960"
      fill={color || COLORS.skyPurpil}>
      <Path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </Svg>
  );
};

export default PlusIcon;
