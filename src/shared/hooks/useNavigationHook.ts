import {useNavigation} from '@react-navigation/native';

export const useNavigationHook = () => {
  const navigation = useNavigation();

  const goback = () => {
    navigation.goBack();
  };

  const navigate = (route: string) => {
    navigation.navigate(route as never);
  };

  return {
    goback: goback,
    navigate: navigate,
  };
};
