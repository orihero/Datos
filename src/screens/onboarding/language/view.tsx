import React from 'react';
import {Text, View} from 'react-native';
import LanguageButton from './components/language-button';
import {useOnboardingLanguageHooks} from './hooks';
import {onboardingLanguageStyles} from './styles';
import {EnPngImage, RuPngImage, UzPngImage} from 'shared/assets/images';

const OnboardingLanuageScreen = () => {
  const {onLanguagePress} = useOnboardingLanguageHooks();
  return (
    <View style={onboardingLanguageStyles.container}>
      <View style={onboardingLanguageStyles.card}>
        <Text style={onboardingLanguageStyles.title}>Language/Til/Язык</Text>
        <LanguageButton
          onPress={onLanguagePress('en')}
          text="English"
          image={EnPngImage}
        />
        <LanguageButton
          text="O'zbekcha"
          onPress={onLanguagePress('uz')}
          image={UzPngImage}
        />
        <LanguageButton
          text="Русскый"
          onPress={onLanguagePress('ru')}
          image={RuPngImage}
        />
      </View>
    </View>
  );
};

export default OnboardingLanuageScreen;
