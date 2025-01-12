import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from 'shared/constants/colors';

const PollIcon = ({size = 32, color = COLORS.dargGray}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="white"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M960 864V160c0-53-43-96-96-96H160C107 64 64 107 64 160v704c0 53 43 96 96 96h704c53 0 96-43 96-96zM288 384c-17.68 0-32-14.32-32-32v-64c0-17.68 14.32-32 32-32h256c17.68 0 32 14.32 32 32v64c0 17.68-14.32 32-32 32H288z m0 192c-17.68 0-32-14.32-32-32v-64c0-17.68 14.32-32 32-32h448c17.68 0 32 14.32 32 32v64c0 17.68-14.32 32-32 32H288z m0 192c-17.68 0-32-14.32-32-32v-64c0-17.68 14.32-32 32-32h128c17.68 0 32 14.32 32 32v64c0 17.68-14.32 32-32 32h-128z"
        fill={color}
      />
    </Svg>
  );
};

export default PollIcon;
