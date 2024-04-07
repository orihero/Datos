import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import RN from 'components/RN';
import {COLORS} from 'constants/colors';
import {BOTTOM_BAR_STACK} from 'navigation/navigators/routes';
import React, {FC} from 'react';
import {addAlpha} from 'utils/color';
import {SIZES} from 'utils/dimensions';
import {BottomBarIcons, bottomBarOptions} from '../BottomBarStack.constants';
import {map} from 'lodash';

const MyBottomBar: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const renderItem = (route: any, index: number) => {
    const {options} = descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;

    const isFocused = state.index === index;
    const Icon = BottomBarIcons[label as BOTTOM_BAR_STACK];

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    const activeColor = isFocused ? COLORS.blue2 : COLORS.skyPurpil;

    return (
      <RN.TouchableOpacity
        key={index}
        accessibilityRole="button"
        accessibilityState={isFocused ? {selected: true} : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.button}>
        <Icon size={25} color={activeColor} />
        <RN.Text style={[styles.buttonLabel, {color: activeColor}]}>
          {bottomBarOptions.list[index].label}
        </RN.Text>
      </RN.TouchableOpacity>
    );
  };

  return (
    <RN.View style={styles.container}>{map(state.routes, renderItem)}</RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    width: SIZES.width - 20 * 2,
    backgroundColor: addAlpha(COLORS.ebon, 0.8),
    bottom: 30,
    borderRadius: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default MyBottomBar;
