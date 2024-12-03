import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {HOME_STACK, ROOT_STACK} from '../routes';
import OnboardingStack, {OnbordingStackParamList} from './OnboardingStack';
import BottomBarStack from './BottomBarStack';
import RegisterStack from './RegisterStack';
import {observer} from 'mobx-react-lite';
import {useLocalStore} from 'shared/store/hooks/useLocalStore';
import CreateQuestion from 'screens/main/createQuestion';
import ProfileSettings from 'screens/main/profile/Settings';
import Topics from 'screens/main/topic';
import createTopic from 'screens/main/topic/createNewTopic';
import AnswerScreen from 'screens/main/answer';

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
    <>
      <Stack.Screen name={ROOT_STACK.HOME} component={BottomBarStack} />
      <Stack.Screen
        name={HOME_STACK.ANSWER as never}
        component={AnswerScreen}
      />
      <Stack.Screen
        name={HOME_STACK.CREATE_QUESTION as never}
        component={CreateQuestion}
      />
      <Stack.Screen
        name={HOME_STACK.PROFILE_SETTINGS as never}
        component={ProfileSettings}
      />
      <Stack.Screen name={HOME_STACK.TOPICS as never} component={Topics} />
      <Stack.Screen
        name={HOME_STACK.CREATE_TOPIC as never}
        component={createTopic}
      />
    </>
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
