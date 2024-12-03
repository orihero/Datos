import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IIconProps} from '../../../@types';
import {COLORS} from '../../constants/colors';

const ComentIcon = ({size = 24, color = COLORS.white}: IIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.8583 19.1667L11.9999 23.25L9.14159 19.1667H1.49992C1.1905 19.1667 0.893754 19.0437 0.674957 18.8249C0.456172 18.6062 0.333252 18.3094 0.333252 18V1.66667C0.333252 1.35724 0.456172 1.0605 0.674957 0.841705C0.893754 0.62292 1.1905 0.5 1.49992 0.5H22.4999C22.8093 0.5 23.1061 0.62292 23.3249 0.841705C23.5436 1.0605 23.6666 1.35724 23.6666 1.66667V18C23.6666 18.3094 23.5436 18.6062 23.3249 18.8249C23.1061 19.0437 22.8093 19.1667 22.4999 19.1667H14.8583ZM13.6438 16.8333H21.3333V2.83333H2.66659V16.8333H10.3561L11.9999 19.1807L13.6438 16.8333Z"
        fill={color}
      />
    </Svg>
  );
};

export default ComentIcon;
