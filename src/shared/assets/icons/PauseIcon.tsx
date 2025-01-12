import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from 'shared/constants/colors';

const PauseIcon = ({size = 24, color = COLORS.white}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"
        fill={color}
      />
    </Svg>
  );
};

export default PauseIcon;
