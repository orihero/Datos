import React from 'react';
import {TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import CrossRedCircleSmallIcon from 'shared/assets/icons/CrossRedCircleSmallIcon';
import VerticalMenu from 'shared/assets/icons/VerticalMenu';

interface PollOptionProps {
  id: string;
  text: string;
  onChangeText: (text: string) => void;
  onRemove?: () => void;
  canRemove: boolean;
  onDragEnd: (position: number) => void;
  index: number;
}

const COLORS = {
  white: '#FFFFFF',
  lightGray: '#A0A0A0',
  darkGray: '#2A2A2A',
};

export const PollOption = ({
  id,
  text,
  onChangeText,
  onRemove,
  canRemove,
  onDragEnd,
}: PollOptionProps) => {
  const translateY = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler({
    onStart: () => {
      'worklet';
    },
    onActive: event => {
      'worklet';
      translateY.value = event.translationY;
    },
    onEnd: () => {
      'worklet';
      const finalPosition = Math.round(translateY.value / 60);
      runOnJS(onDragEnd)(finalPosition);
      translateY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{translateY: translateY.value}],
      zIndex: translateY.value !== 0 ? 1 : 0,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={styles.dragHandle}>
          <VerticalMenu size={20} color={COLORS.lightGray} />
        </Animated.View>
      </PanGestureHandler>

      <TextInput
        value={text}
        onChangeText={onChangeText}
        placeholder={`Option ${id}`}
        placeholderTextColor={COLORS.lightGray}
        style={styles.input}
      />

      {canRemove && onRemove && (
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <CrossRedCircleSmallIcon size={20} color={COLORS.lightGray} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default PollOption;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkGray,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dragHandle: {
    padding: 4,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    marginLeft: 10,
    fontSize: 16,
  },
  removeButton: {
    padding: 4,
  },
});
