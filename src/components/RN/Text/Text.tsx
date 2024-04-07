import React, {FC} from 'react';
import {Text as RNText, TextProps, View} from 'react-native';

import {isNull, isUndefined, isString} from 'lodash';
import {FontFamily} from 'constants/fonts';

type Props = {
  color?: string;
  font?: keyof typeof FontFamily;
} & TextProps;

const Text: FC<Props> = ({
  children,
  color,
  font = 'Regular',
  style,
  ...resOfProps
}) => {
  if (isUndefined(children) || isNull(children) || !isString(children)) {
    return <View />;
  }

  return (
    <RNText
      {...resOfProps}
      style={[!!color && {color}, {fontFamily: FontFamily[font]}, style]}>
      {children}
    </RNText>
  );
};

export default Text;
