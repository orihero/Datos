import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NavigationService from 'shared/navigation/NavigationService';
import MainStack from 'shared/navigation/navigators/MainStack';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {CoreStyle} from 'shared/styles/globalStyles';
import messaging from '@react-native-firebase/messaging';
import {AppState} from 'react-native';

const App = () => {
  const {local, user} = useRootStore();
  useEffect(() => {
    local.getValuesFromDB();
  }, [local]);

  useEffect(() => {
    user.getUserInfo();
  }, [local, user]);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        user.setActiveUser(true);
      } else if (nextAppState === 'background') {
        user.setActiveUser(false);
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);
  console.log('user', user.state.active);

  // async function setupMessaging() {
  //   try {
  //     // Qurilmani masofaviy xabarlar uchun ro'yxatdan o'tkazing
  //     await messaging().registerDeviceForRemoteMessages();

  //     // Tokenni oling
  //     const token = await messaging().getToken();
  //     console.log('FCM Token:', token);
  //   } catch (error) {
  //     console.error('Messaging setup error:', error);
  //   }
  // }

  useEffect(() => {
    requestUserPermission();
    // setupMessaging();
  }, []);

  GoogleSignin.configure({
    webClientId:
      '1042709637721-ai9hlsit7f18skuu5blsj9i7u9dbtg4l.apps.googleusercontent.com',
  });

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={CoreStyle.flex1}>
        <NavigationContainer ref={NavigationService.ref}>
          <MainStack />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
