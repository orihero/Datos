import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const CameraIcon = ({size = 24, color = 'black'}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}>
      <Path fill="none" d="M0 0h24v24H0V0z" />
      <Circle cx="12" cy="12" r="3" />
      <Path d="M20 4h-3.17l-1.24-1.35c-.37-.41-.91-.65-1.47-.65H9.88c-.56 0-1.1.24-1.48.65L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
    </Svg>
  );
};

export default CameraIcon;
