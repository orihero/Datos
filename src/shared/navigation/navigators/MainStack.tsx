import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ROOT_STACK} from './routes';
import OnboardingStack, {OnbordingStackParamList} from './OnboardingStack';
import BottomBarStack from './BottomBarStack';
import RegisterStack from './RegisterStack';

export type RootStackParamList = {
  [ROOT_STACK.ONBOARDING]: NavigatorScreenParams<OnbordingStackParamList>;
  [ROOT_STACK.AUTH]: undefined;
  [ROOT_STACK.HOME]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={ROOT_STACK.AUTH}>
    <Stack.Screen name={ROOT_STACK.ONBOARDING} component={OnboardingStack} />
    <Stack.Screen name={ROOT_STACK.AUTH} component={RegisterStack} />
    <Stack.Screen name={ROOT_STACK.HOME} component={BottomBarStack} />
  </Stack.Navigator>
);

export default MainStack;
