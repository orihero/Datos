import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors';

const {height, width} = Dimensions.get('screen');

export const onboardingStepsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  animation: {
    width: width - 100,
    height: width - 100,
    marginTop: 50,
  },
  item: {
    width,
    alignItems: 'center',
  },
  dot: {
    width: 16,
    height: 4,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    marginRight: 6,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activeDot: {
    width: 16,
    height: 4,
    borderRadius: 6,
    backgroundColor: COLORS.blue,
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  textContainer: {
    width,
  },
  title: {
    color: COLORS.white,
  },
});
