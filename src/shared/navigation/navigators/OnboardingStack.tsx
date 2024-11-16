import {CompositeScreenProps} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {ONBOARDING_STACK} from '../routes';
import SplashScreen from 'screens/onboarding/splash';
import OnboardingLanuageScreen from 'screens/onboarding/language';
import {RootStackParamList, RootStackScreenProps} from './MainStack';

export type OnbordingStackParamList = {
  [ONBOARDING_STACK.SPLASH]: undefined;
  [ONBOARDING_STACK.ONBOARDING_LANGUAGE]: undefined;
};

export type OnbardingStackProps<T extends keyof OnbordingStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<OnbordingStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

const Stack = createNativeStackNavigator<OnbordingStackParamList>();

const OnboardingStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={ONBOARDING_STACK.SPLASH} component={SplashScreen} />
    <Stack.Screen
      name={ONBOARDING_STACK.ONBOARDING_LANGUAGE}
      component={OnboardingLanuageScreen}
      options={{animation: 'none'}}
    />
  </Stack.Navigator>
);

export default OnboardingStack;
