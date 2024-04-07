import React, {FC} from 'react';
import {Text as RNText, TextProps, View} from 'react-native';

import {isNull, isUndefined, isString} from 'lodash';

type Props = {
  color?: string;
} & TextProps;

const Text: FC<Props> = ({children, color, style, ...resOfProps}) => {
  if (isUndefined(children) || isNull(children) || !isString(children)) {
    return <View />;
  }

  return (
    <RNText {...resOfProps} style={[style, !!color && {color}]}>
      {children}
    </RNText>
  );
};

export default Text;
