import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const CloseIcon = ({size = 24, color = 'currentColor'}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G>
        <Path
          d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59 7.71 6.29a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default CloseIcon;
