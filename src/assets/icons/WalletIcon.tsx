import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IIconProps} from '../../@types';
import {COLORS} from '../../constants/colors';

const WalletIcon = ({size, color}: IIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        d="M22.8335 12.5V17.5C22.8335 20.5 20.8335 22.5 17.8335 22.5H7.8335C4.8335 22.5 2.8335 20.5 2.8335 17.5V12.5C2.8335 9.78 4.4735 7.88 7.0235 7.56C7.2835 7.52 7.5535 7.5 7.8335 7.5H17.8335C18.0935 7.5 18.3435 7.50999 18.5835 7.54999C21.1635 7.84999 22.8335 9.76 22.8335 12.5Z"
        stroke={color || COLORS.skyPurpil}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.5849 7.55C18.3449 7.51 18.0949 7.50001 17.8349 7.50001H7.8349C7.5549 7.50001 7.2849 7.52001 7.0249 7.56001C7.1649 7.28001 7.3649 7.02001 7.6049 6.78001L10.8549 3.52C12.2249 2.16 14.4449 2.16 15.8149 3.52L17.5649 5.29002C18.2049 5.92002 18.5449 6.72 18.5849 7.55Z"
        stroke={color || COLORS.skyPurpil}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.8335 13H19.8335C18.7335 13 17.8335 13.9 17.8335 15C17.8335 16.1 18.7335 17 19.8335 17H22.8335"
        stroke={color || COLORS.skyPurpil}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default WalletIcon;
