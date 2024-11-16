import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IIconProps} from '../../../@types';
import {COLORS} from '../../constants/colors';

const ArrowDownIcon = ({size, color}: IIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.52925 5.52864C3.7896 5.26829 4.21171 5.26829 4.47206 5.52864L8.00065 9.05723L11.5292 5.52864C11.7896 5.26829 12.2117 5.26829 12.4721 5.52864C12.7324 5.78899 12.7324 6.2111 12.4721 6.47145L8.47205 10.4714C8.21171 10.7318 7.7896 10.7318 7.52925 10.4714L3.52925 6.47145C3.2689 6.2111 3.2689 5.78899 3.52925 5.52864Z"
        fill={color || COLORS.black}
      />
    </Svg>
  );
};

export default ArrowDownIcon;
