import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ROUTES} from './routes';
import OnboardingStack, {OnbordingStackParamList} from './OnboardingStack';

export type RootStackParamList = {
  [ROUTES.ROOT.ONBOARDING]: NavigatorScreenParams<OnbordingStackParamList>;
  [ROUTES.ROOT.AUTH]: undefined;
  [ROUTES.ROOT.HOME]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.ROOT.ONBOARDING} component={OnboardingStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
