import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ReplyIcon = ({size = 24, color = 'black'}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path
        d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"
        fill={color}
      />
    </Svg>
  );
};

export default ReplyIcon;
