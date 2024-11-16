import React from 'react';
import {REGISTER_STACK} from '../routes';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import LoginScreen from 'screens/register/login';
import ConfirmCodeScreen from 'screens/register/confirm-code';
import SetupScreen from 'screens/register/setup';

export type RegisterStackParamList = {
  [REGISTER_STACK.LOG_IN]: undefined;
  [REGISTER_STACK.CONFIRM]: undefined;
  [REGISTER_STACK.SET_UP]: {
    uid: string;
  };
};

export type RegisterStackScreenProps<T extends keyof RegisterStackParamList> =
  NativeStackScreenProps<RegisterStackParamList, T>;

const Stack = createNativeStackNavigator<RegisterStackParamList>();

const RegisterStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={REGISTER_STACK.LOG_IN} component={LoginScreen} />
    <Stack.Screen name={REGISTER_STACK.CONFIRM} component={ConfirmCodeScreen} />
    <Stack.Screen name={REGISTER_STACK.SET_UP} component={SetupScreen} />
  </Stack.Navigator>
);

export default RegisterStack;
