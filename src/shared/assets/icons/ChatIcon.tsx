import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IIconProps} from '../../../@types';
import {COLORS} from '../../constants/colors';

const ChatIcon = ({size, color}: IIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Path
        d="M16.8583 22.1667L13.9999 26.25L11.1416 22.1667H3.49992C3.1905 22.1667 2.89375 22.0437 2.67496 21.8249C2.45617 21.6062 2.33325 21.3094 2.33325 21V4.66667C2.33325 4.35724 2.45617 4.0605 2.67496 3.84171C2.89375 3.62292 3.1905 3.5 3.49992 3.5H24.4999C24.8093 3.5 25.1061 3.62292 25.3249 3.84171C25.5436 4.0605 25.6666 4.35724 25.6666 4.66667V21C25.6666 21.3094 25.5436 21.6062 25.3249 21.8249C25.1061 22.0437 24.8093 22.1667 24.4999 22.1667H16.8583ZM15.6438 19.8333H23.3333V5.83333H4.66659V19.8333H12.3561L13.9999 22.1807L15.6438 19.8333Z"
        fill={color || COLORS.skyPurpil}
      />
    </Svg>
  );
};

export default ChatIcon;
