import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors';

export const onboardingLanguageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
  },
  card: {
    marginHorizontal: 24,
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: COLORS.dargGray,
    borderRadius: 40,
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 30,
  },
});
