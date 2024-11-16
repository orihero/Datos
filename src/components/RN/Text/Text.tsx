import React, {FC, useMemo} from 'react';
import {
  Text as RNText,
  StyleProp,
  TextProps,
  TextStyle,
  View,
} from 'react-native';

import {isNull, isUndefined} from 'lodash';
import {FontFamily, FontSize} from 'shared/constants/fonts';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight} from 'shared/utils/dimensions';

type Props = {
  color?: string;
  font?: keyof typeof FontFamily;
  size?: keyof typeof FontSize;
  style?: StyleProp<TextStyle>;
} & TextProps;

const Text: FC<Props> = ({
  children,
  color = COLORS.black,
  font = 'Regular',
  size = 'h5',
  style = {},
  ...resOfProps
}) => {
  const customStyles = useMemo(() => {
    let normalizedSize: number = normalizeHeight(FontSize[size]);
    if (!!style && 'fontSize' in style && style.fontSize) {
      normalizedSize = normalizeHeight(style.fontSize);
    }
    return [
      !!color && {color},
      {
        fontFamily: FontFamily[font],
      },
      style,
      {
        fontSize: normalizedSize,
      },
    ];
  }, [color, font, size, style]);

  if (isUndefined(children) || isNull(children)) {
    return <View />;
  }

  return (
    <RNText {...resOfProps} style={customStyles}>
      {children}
    </RNText>
  );
};

export default Text;
