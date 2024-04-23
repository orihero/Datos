import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IIconProps} from '../../../@types';
import {COLORS} from '../../constants/colors';

const CheckboxIcon = ({size, color}: IIconProps) => {
  return (
    <Svg width={size} height={size} viewBox={'0 0 20 20'} fill={'none'}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0013 18.3337C14.6037 18.3337 18.3346 14.6027 18.3346 10.0003C18.3346 5.39795 14.6037 1.66699 10.0013 1.66699C5.39893 1.66699 1.66797 5.39795 1.66797 10.0003C1.66797 14.6027 5.39893 18.3337 10.0013 18.3337ZM13.7766 7.94227C14.0207 7.69819 14.0207 7.30246 13.7766 7.05838C13.5325 6.81431 13.1368 6.81431 12.8927 7.05838L9.16797 10.7831L7.94324 9.55838C7.69917 9.31431 7.30344 9.31431 7.05936 9.55838C6.81528 9.80246 6.81528 10.1982 7.05936 10.4423L8.72603 12.1089C8.84324 12.2261 9.00221 12.292 9.16797 12.292C9.33373 12.292 9.4927 12.2261 9.60991 12.1089L13.7766 7.94227Z"
        fill={color ?? COLORS.black}
      />
    </Svg>
  );
};

export default CheckboxIcon;
