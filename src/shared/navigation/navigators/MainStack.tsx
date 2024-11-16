import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ROOT_STACK} from '../routes';
import OnboardingStack, {OnbordingStackParamList} from './OnboardingStack';
import BottomBarStack from './BottomBarStack';
import RegisterStack from './RegisterStack';
import {observer} from 'mobx-react-lite';
import {useLocalStore} from 'shared/store/hooks/useLocalStore';

export type RootStackParamList = {
  [ROOT_STACK.ONBOARDING]: NavigatorScreenParams<OnbordingStackParamList>;
  [ROOT_STACK.AUTH]: undefined;
  [ROOT_STACK.HOME]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  const {userId} = useLocalStore();
  const isAuthenticated = !!userId;

  const renderPrivateStacks = () => (
    <Stack.Screen name={ROOT_STACK.HOME} component={BottomBarStack} />
  );

  const renderPublicStack = () => (
    <>
      <Stack.Screen name={ROOT_STACK.ONBOARDING} component={OnboardingStack} />
      <Stack.Screen name={ROOT_STACK.AUTH} component={RegisterStack} />
    </>
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated ? renderPrivateStacks() : renderPublicStack()}
    </Stack.Navigator>
  );
};

export default observer(MainStack);
