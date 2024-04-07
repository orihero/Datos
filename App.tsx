import {NavigationContainer} from '@react-navigation/native';
import MainStack, {RootStackParamList} from 'navigation/navigators/MainStack';
import React from 'react';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const App = () => (
  <NavigationContainer>
    <MainStack />
  </NavigationContainer>
);

export default App;
