import {NavigationContainer} from '@react-navigation/native';
import MainStack, {RootStackParamList} from 'navigation/navigators/MainStack';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CoreStyle} from 'styles/globalStyles';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const App = () => (
  <SafeAreaProvider>
    <GestureHandlerRootView style={CoreStyle.flex1}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  </SafeAreaProvider>
);

export default App;
