import React, {useEffect} from 'react';
import {NavigatorScreenParams, useNavigation} from '@react-navigation/native';
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
import Topics from 'screens/main/topic';
import createTopic from 'screens/main/topic/createNewTopic';
import AnswerScreen from 'screens/main/answer';
import MyPosts from 'screens/main/profile/myPosts';
import previewTopic from 'screens/main/previewTopic';
import previewUser from 'screens/main/previewUser';
import previewUserPosts from 'screens/main/previewUser/posts';
import MyFollowers from 'screens/main/profile/followers/MyFollowers';
import TopicsFollowedByMe from 'screens/main/profile/topics/Topics';
import EditAccount from 'screens/main/profile/editAccount/EditAccount';
import Settings from 'screens/main/profile/settings/Settings';

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
  console.log('isAuthenticated', isAuthenticated);
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{name: ROOT_STACK.ONBOARDING as never}],
      });
    }
  }, [isAuthenticated, navigation]);

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
        name={HOME_STACK.EDIT_ACCOUNT as never}
        component={EditAccount}
      />
      <Stack.Screen name={HOME_STACK.TOPICS as never} component={Topics} />
      <Stack.Screen
        name={HOME_STACK.CREATE_TOPIC as never}
        component={createTopic}
      />
      <Stack.Screen name={HOME_STACK.MY_POSTS as never} component={MyPosts} />
      <Stack.Screen
        name={HOME_STACK.PREVIEW_TOPIC as never}
        component={previewTopic}
      />
      <Stack.Screen
        name={HOME_STACK.PREVIEW_USER as never}
        component={previewUser}
      />
      <Stack.Screen
        name={HOME_STACK.PREVIEW_USER_POSTS as never}
        component={previewUserPosts}
      />
      <Stack.Screen
        name={HOME_STACK.MY_FOLLOWERS as never}
        component={MyFollowers}
      />
      <Stack.Screen
        name={HOME_STACK.TOPICS_FOLLOWED_BY_ME as never}
        component={TopicsFollowedByMe}
      />
      <Stack.Screen name={HOME_STACK.SETTINGS as never} component={Settings} />
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
