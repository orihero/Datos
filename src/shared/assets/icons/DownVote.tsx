import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from 'shared/constants/colors';

const DownIcon = ({size = 500, color = COLORS.white}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      style={{transform: [{rotate: `${-45}deg`}]}}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M410.557,349.186c-1.081,7.451-4.543,14.638-10.256,20.362  c-14.179,14.168-37.166,14.168-51.337,0l-25.711-25.715c-7.092-7.087-18.635-7.087-25.715,0l-86.219,86.127  c-14.177,14.267-37.162,14.267-51.336,0l-89.946-89.94c-14.261-14.18-14.261-37.166,0-51.338l86.131-86.222  c7.083-7.089,7.083-18.623,0-25.712l-25.713-25.713c-14.174-14.17-14.174-37.158,0-51.328c5.728-5.722,12.901-9.173,20.35-10.265  l245.583-31.444c25.26,0,45.614,20.354,45.614,45.614L410.557,349.186z"
        fill={color}
        transform="rotate(0, 250, 250)"
      />
    </Svg>
  );
};

export default DownIcon;
