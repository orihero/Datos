import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NavigationService from 'shared/navigation/NavigationService';
import MainStack from 'shared/navigation/navigators/MainStack';
import {CoreStyle} from 'shared/styles/globalStyles';

const App = () => {
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
