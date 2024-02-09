import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import OnboardingStack, {OnbordingStackParamList} from './onboarding';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ROUTES} from './routes';

export type RootStackParamList = {
  [ROUTES.ROOT.ONBOARDING]: NavigatorScreenParams<OnbordingStackParamList>;
  [ROUTES.ROOT.AUTH]: undefined;
  [ROUTES.ROOT.HOME]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.ROOT.ONBOARDING} component={OnboardingStack} />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default RootNavigation;
