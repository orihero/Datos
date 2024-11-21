import React, {PropsWithChildren, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  interpolate,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export interface FadeInOutProps {
  direction: 'left' | 'right';
}

const FadeInOut = ({
  direction,
  children,
}: FadeInOutProps & PropsWithChildren) => {
  const INITIAL_OFFSET = 100;
  const DIRECTION_VALUE = direction == 'left' ? -1 : 1;
  const val = useSharedValue(INITIAL_OFFSET * DIRECTION_VALUE);
  const opacity = interpolate(
    val.value,
    [INITIAL_OFFSET * DIRECTION_VALUE, 0],
    [0, 1],
    'clamp',
  );
  useEffect(() => {
    val.value = withTiming(0);
    return () => {
      val.value = withSpring(DIRECTION_VALUE * INITIAL_OFFSET); // hide completely when unmounted
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateX: val}],
          opacity: 1,
        },
      ]}>
      {children}
    </Animated.View>
  );
};

export default FadeInOut;

const styles = StyleSheet.create({
  container: {},
});
