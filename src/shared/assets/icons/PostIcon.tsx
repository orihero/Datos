import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from 'shared/constants/colors';

const PostIcon = ({size = 24, color = COLORS.white}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M616.4 312H406.5c-13.4 0-25-9.3-27.8-22.4l-37.6-171c-1.8-8.4 0.2-17.2 5.6-24 5.4-6.7 13.6-10.6 22.2-10.6h285c8.6 0 16.8 4 22.2 10.7 5.4 6.7 7.5 15.5 5.7 24l-37.6 171c-2.9 13-14.4 22.3-27.8 22.3z m-187-57h164l25-114h-214l25 114z m82.1 687c-8 0-15.6-3.4-21-9.2L290.9 715c-6.2-6.8-8.8-16.2-6.8-25.3l76.2-298.2c2.8-13.1 14.4-22.5 27.9-22.5h246.6c13.4 0 25 9.4 27.8 22.5l76.2 298.2c2 9-0.6 18.5-6.8 25.3L532.4 932.7c-5.4 5.9-13 9.3-20.9 9.3zM342.9 687.3l168.6 184 168.6-184L611.8 426H411.1l-68.2 261.3z m0 0"
        fill={color}
      />
    </Svg>
  );
};

export default PostIcon;