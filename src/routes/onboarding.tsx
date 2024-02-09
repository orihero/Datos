import {CompositeScreenProps} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList, RootStackScreenProps} from '.';
import SplashScreen from '../screens/onboarding/splash';
import OnboardingStepsScreen from '../screens/onboarding/steps';
import {ROUTES} from './routes';
import OnboardingLanuageScreen from '../screens/onboarding/language';

export type OnbordingStackParamList = {
  [ROUTES.ONBARDING.SPLASH]: undefined;
  [ROUTES.ONBARDING.ONBOARDING_LANGUAGE]: undefined;
  [ROUTES.ONBARDING.ONBOARDING_STEPS]: undefined;
};

export type OnbardingStackProps<T extends keyof OnbordingStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<OnbordingStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

const Stack = createNativeStackNavigator<OnbordingStackParamList>();

const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.ONBARDING.SPLASH} component={SplashScreen} />
      <Stack.Screen
        name={ROUTES.ONBARDING.ONBOARDING_LANGUAGE}
        component={OnboardingLanuageScreen}
        options={{animation: 'none'}}
      />
      <Stack.Screen
        name={ROUTES.ONBARDING.ONBOARDING_STEPS}
        component={OnboardingStepsScreen}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
