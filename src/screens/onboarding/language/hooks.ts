import {useNavigation} from '@react-navigation/native';
import {STRINGS} from '../../../localization/strings';
import {OnbardingStackProps} from 'shared/navigation/navigators/OnboardingStack';
import {ONBOARDING_STACK} from 'shared/navigation/routes';

export const useOnboardingLanguageHooks = () => {
  const navigation =
    useNavigation<
      OnbardingStackProps<ONBOARDING_STACK.ONBOARDING_LANGUAGE>['navigation']
    >();

  const onLanguagePress = (key: string) => () => {
    STRINGS.setLanguage(key);
    navigation.navigate(ONBOARDING_STACK.LOTTIE);
  };

  return {onLanguagePress};
};
