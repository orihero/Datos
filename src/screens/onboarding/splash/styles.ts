import {StyleSheet} from 'react-native';
import {COLORS} from '../../../shared/constants/colors';

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  text: {
    fontFamily: 'NicoMoji-Regular',
    color: COLORS.white,
    fontSize: 50,
  },
});
