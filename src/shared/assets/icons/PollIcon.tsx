import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from 'shared/constants/colors';

const PollIcon = ({size = 24, color = COLORS.white}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M256 469.333333h682.666667v85.333334H256z m0-170.666666h510.72v85.333333H256z m0 341.333333h384v85.333333H256zM85.333333 170.666667h85.333334v682.666666H85.333333z"
        fill={color}
      />
    </Svg>
  );
};

export default PollIcon;
