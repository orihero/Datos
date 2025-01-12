import {Button} from 'components/Button';
import Container from 'components/Container';
import {PhoneInput} from 'components/Inputs/PhoneInput';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';
import {useRegister} from 'shared/store/hooks/useRegister';
import {addAlpha} from 'shared/utils/color';
import GoogleIcon from 'shared/assets/icons/GoogleIcon';
import {useTranslation} from 'react-i18next';
import TripleHeader from 'components/TripleHeader/TripleHeader';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import NavigationService from 'shared/navigation/NavigationService';
import {Keyboard} from 'react-native';

function LoginScreen() {
  const {t} = useTranslation();
  const {
    state,
    onChangeOfLogin,
    onLoginWithPhone,
    loadingWhenLogIn,
    loadingWhenGoogleLogIn,
    onSignInWithGoogle,
  } = useRegister();

  const inputValue = state.login.input;
  const disabledButton = !inputValue;
  return (
    <Container
      onPress={() => Keyboard.dismiss()}
      Header={
        <TripleHeader
          title={`${t('login')}`}
          leftItem={
            <RN.TouchableOpacity onPress={() => NavigationService.goBack()}>
              <ArrowLeftIcon color={COLORS.white} size={22} />
            </RN.TouchableOpacity>
          }
        />
      }>
      <RN.View style={styles.container}>
        <RN.Text size="h1" font="Bold">
          {t('enter_phone_number')}
        </RN.Text>
        <Spacing steps={2} />
        <PhoneInput
          inputValue={inputValue}
          selectedCountry={state.login.country}
          placeholder={`${t('enter_phone')}`}
          onChangeCountry={country => onChangeOfLogin('country', country)}
          onChangeInputValue={input => onChangeOfLogin('input', input)}
        />
        <Spacing steps={2} />
        <Button
          title={t('sign_in')}
          onPress={onLoginWithPhone}
          disabled={disabledButton}
          loading={loadingWhenLogIn.loading}
        />
        <Spacing steps={2} />
        <Button
          title={t('sign_in_with_google')}
          onPress={onSignInWithGoogle}
          loading={loadingWhenGoogleLogIn.loading}
          icon={<GoogleIcon size={32} />}
          outline
        />
      </RN.View>
    </Container>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: addAlpha(COLORS.black, 0.6),
    fontSize: 17,
    fontFamily: FontFamily.Regular,
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
});

export default observer(LoginScreen);
