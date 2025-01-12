import React from 'react';
import Svg, {Path} from 'react-native-svg';

const FilterIcon = ({
  size = 200,
  color = 'currentColor',
  strokeWidth = 1.5,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M4.5 7h15M7 12h10m-7 5h4"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default FilterIcon;
