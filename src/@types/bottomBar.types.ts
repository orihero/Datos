import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {BOTTOM_BAR_STACK} from 'shared/navigation/routes';

interface BottomBarItem {
  label: string;
  route: BOTTOM_BAR_STACK;
}

export interface BottomBarOptions {
  options: BottomTabNavigationOptions;
  list: BottomBarItem[];
}
