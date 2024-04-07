import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IIconProps} from '../../@types';
import {COLORS} from '../../constants/colors';

const GraphIcon = ({size, color}: IIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        d="M18.4865 12.4999C21.0865 12.4999 22.1665 11.4999 21.2065 8.21994C20.5565 6.00994 18.6565 4.10994 16.4465 3.45994C13.1665 2.49994 12.1665 3.57994 12.1665 6.17994V9.05994C12.1665 11.4999 13.1665 12.4999 15.1665 12.4999H18.4865Z"
        stroke={color || COLORS.skyPurpil}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.1664 15.2C19.2364 19.83 14.7964 23.19 9.74643 22.37C5.95643 21.76 2.90643 18.71 2.28643 14.92C1.47643 9.89001 4.81643 5.45001 9.42643 4.51001"
        stroke={color || COLORS.skyPurpil}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default GraphIcon;
