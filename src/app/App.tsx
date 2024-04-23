import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainStack, {
  RootStackParamList,
} from 'shared/navigation/navigators/MainStack';
import {AuthProvider} from 'shared/services/auth-services';
import {CoreStyle} from 'shared/styles/globalStyles';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Root = () => (
  <NavigationContainer>
    <MainStack />
  </NavigationContainer>
);

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={CoreStyle.flex1}>
          <Root />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default App;
