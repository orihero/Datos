import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IIconProps} from '../../../@types';
import {COLORS} from '../../constants/colors';

const CrossRedCircleSmallIcon = ({size, color}: IIconProps) => {
  return (
    <Svg width={size} height={size} viewBox={'0 0 16 17'} fill={'none'}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.0026 1.33337C4.04456 1.33337 0.835938 4.542 0.835938 8.50004C0.835938 12.4581 4.04456 15.6667 8.0026 15.6667C11.9606 15.6667 15.1693 12.4581 15.1693 8.50004C15.1693 4.542 11.9606 1.33337 8.0026 1.33337ZM5.65063 6.14651C5.84589 5.95125 6.16248 5.95125 6.35774 6.14651L8.00419 7.79296L9.65063 6.14651C9.84589 5.95125 10.1625 5.95125 10.3577 6.14651C10.553 6.34177 10.553 6.65836 10.3577 6.85362L8.71129 8.50007L10.3577 10.1465C10.553 10.3418 10.553 10.6584 10.3577 10.8536C10.1625 11.0489 9.84589 11.0489 9.65063 10.8536L8.00419 9.20717L6.35774 10.8536C6.16248 11.0489 5.84589 11.0489 5.65063 10.8536C5.45537 10.6584 5.45537 10.3418 5.65063 10.1465L7.29708 8.50007L5.65063 6.85362C5.45537 6.65836 5.45537 6.34177 5.65063 6.14651Z"
        fill={color || COLORS.black}
      />
    </Svg>
  );
};

export default CrossRedCircleSmallIcon;
