import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BOTTOM_BAR_STACK} from '../../routes';
import {bottomBarOptions} from './BottomBarStack.constants';
import MyBottomBar from './components/MyBottomBar';
import ProfileScreen from 'screens/main/profile';
import WalletScreen from 'screens/main/wallet';
import StatisticsScreen from 'screens/main/statistics';
import HomeScreen from 'screens/main/home';

export type BottomBarStackParamList = {
  [BOTTOM_BAR_STACK.HOME]: undefined;
  [BOTTOM_BAR_STACK.WALLET]: undefined;
  [BOTTOM_BAR_STACK.STATISTICS]: undefined;
  [BOTTOM_BAR_STACK.PROFILE]: undefined;
};

const Tab = createBottomTabNavigator<BottomBarStackParamList>();

const BottomBarStack = () => {
  return (
    <Tab.Navigator
      screenOptions={bottomBarOptions.options}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <MyBottomBar {...props} />}>
      <Tab.Screen name={BOTTOM_BAR_STACK.HOME} component={HomeScreen} />
      <Tab.Screen name={BOTTOM_BAR_STACK.WALLET} component={WalletScreen} />
      <Tab.Screen
        name={BOTTOM_BAR_STACK.STATISTICS}
        component={StatisticsScreen}
      />
      <Tab.Screen name={BOTTOM_BAR_STACK.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomBarStack;
