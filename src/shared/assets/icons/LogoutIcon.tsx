import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IIconProps} from '../../../@types';
import {COLORS} from '../../constants/colors';

const LogoutIcon = ({size = 24, color = COLORS.black}: IIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512" fill="none">
      <Path
        d="M366.863 323.883l22.627 22.627L480 256l-90.51-90.51-22.628 22.628L418.745 240H192v32h226.745z"
        fill={color}
      />
      <Path
        d="M391.491 391.766C355.229 428.029 307.018 448 255.736 448c-51.287 0-99.506-19.971-135.772-56.235C83.697 355.501 64 307.285 64 256c0-51.281 19.697-99.495 55.965-135.761C156.232 83.973 204.45 64 255.736 64c51.279 0 99.491 19.973 135.755 56.238a196.044 196.044 0 0 1 7.333 7.762h40.731c-40.474-58.028-107.709-96-183.819-96C132.021 32 32 132.298 32 256c0 123.715 100.021 224 223.736 224 76.112 0 143.35-37.97 183.822-96h-40.73a194.792 194.792 0 0 1-7.337 7.766z"
        fill={color}
      />
    </Svg>
  );
};

export default LogoutIcon;
