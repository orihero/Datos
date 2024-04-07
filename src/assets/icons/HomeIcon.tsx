import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IIconProps} from '../../@types';
import {COLORS} from '../../constants/colors';

const HomeIcon = ({size, color}: IIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        d="M9.52 3.34l-5.39 4.2c-.9.7-1.63 2.19-1.63 3.32v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21V11c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12zM12.5 18.49v-3"
        stroke={color || COLORS.skyPurpil}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HomeIcon;
