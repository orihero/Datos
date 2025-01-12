import {useNavigation} from '@react-navigation/native';
import {STRINGS} from '../../../localization/strings';
import {OnbardingStackProps} from 'shared/navigation/navigators/OnboardingStack';
import {ONBOARDING_STACK} from 'shared/navigation/routes';
import {useRootStore} from 'shared/store/hooks/useRootStore';

export const useOnboardingLanguageHooks = () => {
  const {local} = useRootStore();
  const navigation =
    useNavigation<
      OnbardingStackProps<ONBOARDING_STACK.ONBOARDING_LANGUAGE>['navigation']
    >();

  const onLanguagePress = (key: string) => () => {
    local.setLanguage(key);
    STRINGS.setLanguage(key);
    navigation.navigate(ONBOARDING_STACK.LOTTIE);
  };

  return {onLanguagePress};
};
