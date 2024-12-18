import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NavigationService from 'shared/navigation/NavigationService';
import MainStack from 'shared/navigation/navigators/MainStack';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {CoreStyle} from 'shared/styles/globalStyles';

const App = () => {
  const {local} = useRootStore();

  useEffect(() => {
    local.getValuesFromDB();
  }, [local]);

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
