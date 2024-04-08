import React, {FC} from 'react';
import {Text as RNText, TextProps, View} from 'react-native';

import {isNull, isUndefined} from 'lodash';
import {FontFamily, FontSize} from 'shared/constants/fonts';
import {COLORS} from 'shared/constants/colors';

type Props = {
  color?: string;
  font?: keyof typeof FontFamily;
  size?: keyof typeof FontSize;
} & TextProps;

const Text: FC<Props> = ({
  children,
  color = COLORS.black,
  font = 'Regular',
  size = 'h5',
  style,
  ...resOfProps
}) => {
  if (isUndefined(children) || isNull(children)) {
    return <View />;
  }

  return (
    <RNText
      {...resOfProps}
      style={[
        !!color && {color},
        {fontFamily: FontFamily[font], fontSize: FontSize[size]},
        style,
      ]}>
      {children}
    </RNText>
  );
};

export default Text;
