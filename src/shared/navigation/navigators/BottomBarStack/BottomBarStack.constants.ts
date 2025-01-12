import {BottomBarOptions} from '@types';
import {BOTTOM_BAR_STACK} from '../../routes';
import HomeIcon from 'shared/assets/icons/HomeIcon';
import WalletIcon from 'shared/assets/icons/WalletIcon';
import GraphIcon from 'shared/assets/icons/GraphIcon';
import UserIcon from 'shared/assets/icons/UserIcon';
import SearchIcon from 'shared/assets/icons/SearchIcon';

export const bottomBarOptions: BottomBarOptions = {
  options: {
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    headerShown: false,
  },
  list: [
    {
      label: 'home',
      route: BOTTOM_BAR_STACK.HOME,
    },
    {
      label: 'explore',
      route: BOTTOM_BAR_STACK.EXPLORE,
    },
    // {
    //   label: 'Wallet',
    //   route: BOTTOM_BAR_STACK.WALLET,
    // },
    // {
    //   label: 'Statistics',
    //   route: BOTTOM_BAR_STACK.STATISTICS,
    // },
    {
      label: 'profile',
      route: BOTTOM_BAR_STACK.PROFILE,
    },
  ],
};

export const BottomBarIcons = {
  [BOTTOM_BAR_STACK.HOME]: HomeIcon,
  [BOTTOM_BAR_STACK.WALLET]: WalletIcon,
  [BOTTOM_BAR_STACK.STATISTICS]: GraphIcon,
  [BOTTOM_BAR_STACK.PROFILE]: UserIcon,
  [BOTTOM_BAR_STACK.EXPLORE]: SearchIcon,
};
