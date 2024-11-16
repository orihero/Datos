import React from 'react';
import { Text, View } from 'react-native';
import FadeInOut from '../../../components/animations/fade-in-out';
import LanguageButton from './components/language-button';
import { useOnboardingLanguageHooks } from './hooks';
import { onboardingLanguageStyles } from './styles';

const OnboardingLanuageScreen = () => {
  const {onLanguagePress} = useOnboardingLanguageHooks();

  return (
    <View style={onboardingLanguageStyles.container}>
      <View style={onboardingLanguageStyles.card}>
        <Text style={onboardingLanguageStyles.title}>Language/Til/Язык</Text>
        <FadeInOut direction="right">
          <LanguageButton
            onPress={onLanguagePress('en')}
            text="English"
            image={require('../../../assets/images/en.png')}
          />
        </FadeInOut>
        <FadeInOut direction="left">
          <LanguageButton
            text="O'zbekcha"
            onPress={onLanguagePress('uz')}
            image={require('../../../assets/images/uz.png')}
          />
        </FadeInOut>
        <FadeInOut direction="right">
          <LanguageButton
            text="Русскый"
            onPress={onLanguagePress('ru')}
            image={require('../../../assets/images/ru.png')}
          />
        </FadeInOut>
      </View>
    </View>
  );
};

export default OnboardingLanuageScreen;
