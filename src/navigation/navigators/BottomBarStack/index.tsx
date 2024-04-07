import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BOTTOM_BAR_STACK} from '../routes';
import {Text} from 'react-native';
import {bottomBarOptions} from './BottomBarStack.constants';
import MyBottomBar from './components/MyBottomBar';

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
      tabBar={MyBottomBar}>
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

const HomeScreen = () => <Text>HOME Screen</Text>;
const WalletScreen = () => <Text>WALLET Screen</Text>;
const StatisticsScreen = () => <Text>STATISTICS Screen</Text>;
const ProfileScreen = () => <Text>PROFILE Screen</Text>;

export default BottomBarStack;
