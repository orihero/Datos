import {useNavigation} from '@react-navigation/native';
import {STRINGS} from '../../../localization/strings';
import {OnbardingStackProps} from '../../../routes/onboarding';
import {ONBOARDING_STACK, ROUTES} from '../../../routes/routes';

export const useOnboardingLanguageHooks = () => {
  const navigation =
    useNavigation<
      OnbardingStackProps<ONBOARDING_STACK.ONBOARDING_LANGUAGE>['navigation']
    >();

  const onLanguagePress = (key: string) => () => {
    STRINGS.setLanguage(key);
    navigation.navigate(ROUTES.ONBARDING.ONBOARDING_STEPS);
  };

  return {onLanguagePress};
};
