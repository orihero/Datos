import React, {FC} from 'react';
import {Text as RNText, TextProps, View} from 'react-native';

import {isNull, isUndefined, isString} from 'lodash';
import {FontFamily, FontSize} from 'constants/fonts';

type Props = {
  color?: string;
  font?: keyof typeof FontFamily;
  size?: keyof typeof FontSize;
} & TextProps;

const Text: FC<Props> = ({
  children,
  color,
  font = 'Regular',
  size = 'h5',
  style,
  ...resOfProps
}) => {
  if (isUndefined(children) || isNull(children) || !isString(children)) {
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
