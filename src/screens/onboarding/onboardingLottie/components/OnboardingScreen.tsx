import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native';
import {ONBOARDING_STACK} from 'shared/navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {OnbardingStackProps} from 'shared/navigation/navigators/OnboardingStack';
import {COLORS} from 'shared/constants/colors';
import {useTranslation} from 'react-i18next';

interface Slide {
  key: number;
  title: string;
  text: string;
  animation: any;
}

const slides: Slide[] = [
  {
    key: 1,
    title: 'stepOneTitle',
    text: 'stepOneDescription',
    animation: require('../../../../shared/assets/lottie/onboarding-1.json'),
  },
  {
    key: 2,
    title: 'stepTwoTitle',
    text: 'stepTwoDescription',
    animation: require('../../../../shared/assets/lottie/onboarding-2.json'),
  },
  {
    key: 3,
    title: 'stepThreeTitle',
    text: 'stepThreeDescription',
    animation: require('../../../../shared/assets/lottie/onboarding-3.json'),
  },
];

const OnboardingScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<OnbardingStackProps<ONBOARDING_STACK.LOTTIE>['navigation']>();
  const renderItem = ({item}: {item: Slide}) => (
    <View style={styles.slide}>
      <LottieView source={item.animation} autoPlay loop style={styles.lottie} />
      <Text style={styles.title}>{t(item.title)}</Text>
      <Text style={styles.text}>{t(item.text)}</Text>
    </View>
  );

  const renderNextButton = () => (
    <View style={styles.nextButton}>
      <Text style={styles.nextButtonText}>{t('next')}</Text>
    </View>
  );
  const renderDoneButton = () => (
    <View style={styles.finishButton}>
      <Text style={styles.nextButtonText}>{t('continue')}</Text>
    </View>
  );
  const onInterestsPress = () => {
    navigation.navigate(ONBOARDING_STACK.INTERESTS);
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      showNextButton
      showDoneButton
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      bottomButton={true}
      onDone={onInterestsPress}
    />
  );
};

interface Styles {
  slide: ViewStyle;
  lottie: ImageStyle;
  title: TextStyle;
  text: TextStyle;
  nextButton: ViewStyle;
  nextButtonText: TextStyle;
  dotStyle: ViewStyle;
  activeDotStyle: ViewStyle;
  finishButton: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  slide: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 100,
  },
  nextButton: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 60,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  finishButton: {
    backgroundColor: COLORS.blue,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 60,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dotStyle: {
    width: 30,
    height: 14,
    backgroundColor: COLORS.black,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 3,
    borderColor: COLORS.lightGray,
    borderStyle: 'solid',
  },
  activeDotStyle: {
    width: 30,
    height: 14,
    backgroundColor: COLORS.blue,
    borderRadius: 8,
  },
});

export default OnboardingScreen;
