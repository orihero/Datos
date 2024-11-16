import {useRef, useState} from 'react';
import anim1 from '../../../assets/lottie/onboarding-1.json';
import anim2 from '../../../assets/lottie/onboarding-2.json';
import anim3 from '../../../assets/lottie/onboarding-3.json';
import {STRINGS} from '../../../localization/strings';
import Animated, {
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

export const useOnboardingStepsHook = () => {
  const scrollX = useSharedValue(0);
  const translateX = useDerivedValue(() => (scrollX.value / width) * 22);
  const textScrollRef = useRef<Animated.ScrollView>(null);
  return {
    scrollX,
    translateX,
    textScrollRef,
    stepsData: [
      {
        animation: anim1,
        title: STRINGS.stepOneTitle,
        description: STRINGS.stepOneDescription,
      },
      {
        animation: anim2,
        title: STRINGS.stepTwoTitle,
        description: STRINGS.stepTwoDescription,
      },
      {
        animation: anim3,
        title: STRINGS.stepThreeTitle,
        description: STRINGS.stepThreeDescription,
      },
    ],
  };
};
