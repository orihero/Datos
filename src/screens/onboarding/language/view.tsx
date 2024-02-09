import React from 'react';
import { Text, View } from 'react-native';
import LanguageButton from './components/language-button';
import { useOnboardingLanguageHooks } from './hooks';
import { onboardingLanguageStyles } from './styles';

const OnboardingLanuageScreen = () => {
  const {onLanguagePress} = useOnboardingLanguageHooks();
  return (
    <View style={onboardingLanguageStyles.container}>
      <View style={onboardingLanguageStyles.card}>
        <Text style={onboardingLanguageStyles.title}>Language/Til/Язык</Text>
        <LanguageButton
          onPress={onLanguagePress('en')}
          text="English"
          image={require('../../../assets/images/en.png')}
        />
        <LanguageButton
          text="O'zbekcha"
          onPress={onLanguagePress('uz')}
          image={require('../../../assets/images/uz.png')}
        />
        <LanguageButton
          text="Русскый"
          onPress={onLanguagePress('ru')}
          image={require('../../../assets/images/ru.png')}
        />
      </View>
    </View>
  );
};

export default OnboardingLanuageScreen;
