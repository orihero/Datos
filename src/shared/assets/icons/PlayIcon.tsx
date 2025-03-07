import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from 'shared/constants/colors';

const PlayIcon = ({size = 24, color = COLORS.white}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"
        fill={color}
      />
    </Svg>
  );
};

export default PlayIcon;
