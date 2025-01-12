import RN from 'components/RN';
import React, {useEffect, useRef} from 'react';
import {Animated, TextStyle, ViewStyle} from 'react-native';

import {ONBOARDING_STACK} from 'shared/navigation/routes';
import {COLORS} from '../../../shared/constants/colors';
import {SIZES} from 'shared/utils/dimensions';
import NavigationService from 'shared/navigation/NavigationService';

const {width: wWidth, height: wHeight} = SIZES;

const SplashScreen = () => {
  const animationValue = useRef(new Animated.Value(0)).current;
  ONBOARDING_STACK.SPLASH;
  const animationInterpolationMapper = (
    val: Animated.Value,
  ): {text: TextStyle; view: ViewStyle} => {
    return {
      text: {
        opacity: val.interpolate({
          inputRange: [0, 3, 4, 100],
          outputRange: [0, 0, 1, 1],
        }),
        width: val.interpolate({
          inputRange: [0, 3, 4],
          outputRange: [0, 0, wWidth],
        }),
        transform: [
          {translateY: wHeight / 2 - 112},
          {
            translateX: val.interpolate({
              inputRange: [0, 3, 4, 5],
              outputRange: [0, 0, 80, 80],
            }),
          },
        ],
      },
      view: {
        width: val.interpolate({
          inputRange: [1, 2, 3, 100],
          outputRange: [100, 100, 25, 25],
        }),
        height: val.interpolate({
          inputRange: [1, 2, 3, 100],
          outputRange: [100, 100, 25, 25],
        }),
        opacity: val.interpolate({
          inputRange: [0, 1, 100],
          outputRange: [0, 1, 1],
        }),
        borderRadius: val.interpolate({
          inputRange: [1, 2, 3, 100],
          outputRange: [20, 20, 100, 100],
        }),
        transform: [
          {
            translateX: val.interpolate({
              inputRange: [1, 2, 3, 4, 5, 100],
              outputRange: [
                wWidth / 2 - 50,
                wWidth / 2 - 50,
                wWidth / 2 - 50 + 75 / 2,
                wWidth / 2 - 50 + 130,
                wWidth / 2 - 50 + 130,
                wWidth / 2 - 50 + 130,
              ],
            }),
          },
          {
            translateY: val.interpolate({
              inputRange: [0, 1, 2, 100],
              outputRange: [
                wHeight / 2 + 50,
                wHeight / 2 - 150,
                wHeight / 2 - 150,
                wHeight / 2 - 150,
              ],
            }),
          },
          {
            rotate: val.interpolate({
              inputRange: [0, 1, 2, 3],
              outputRange: ['0deg', '0deg', '45deg', '45deg'],
            }),
          },
          {
            scale: val.interpolate({
              inputRange: [0, 1, 3, 4, 5],
              outputRange: [1, 1, 1, 1, 100],
            }),
          },
        ],
      },
    };
  };

  useEffect(() => {
    const duration = 300;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        Animated.timing(animationValue, {
          toValue: i + 1,
          useNativeDriver: false,
          duration,
          delay: duration,
        }).start(
          i === 4
            ? () => {
                NavigationService.navigate(
                  ONBOARDING_STACK.ONBOARDING_LANGUAGE,
                );
              }
            : undefined,
        );
      }, i * (duration * 2));
    }
  }, [animationValue]);

  const {text, view} = animationInterpolationMapper(animationValue);

  return (
    <RN.View style={splashStyles.container}>
      <RN.Animated.View style={{...text}}>
        <RN.Text
          numberOfLines={1}
          ellipsizeMode="clip"
          style={splashStyles.text}>
          DATOS
        </RN.Text>
      </RN.Animated.View>
      <RN.Animated.View
        style={{
          backgroundColor: COLORS.blue,
          ...view,
        }}
      />
    </RN.View>
  );
};

export const splashStyles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  text: {
    fontFamily: 'NicoMoji-Regular',
    color: COLORS.white,
    fontSize: 50,
  },
});

export default SplashScreen;
