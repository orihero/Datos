import React from 'react';
import RootNavigation, {RootStackParamList} from './src/routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const App = () => {
  return <RootNavigation />;
};

export default App;
