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

function LoginScreen() {
  const {state, onChangeOfLogin, onLoginWithPhone, loadingWhenLogIn} =
    useRegister();

  const inputValue = state.login.input;
  const disabledButton = !inputValue;
  return (
    <Container background={COLORS.white} isPaddingTop>
      <RN.View style={styles.container}>
        <RN.Text size="h1" font="Bold">
          Enter your mobile number!
        </RN.Text>
        <Spacing steps={2} />
        <PhoneInput
          inputValue={inputValue}
          selectedCountry={state.login.country}
          onChangeCountry={country => onChangeOfLogin('country', country)}
          onChangeInputValue={input => onChangeOfLogin('input', input)}
        />
        <Spacing steps={4} />
        <Button
          title="Log In"
          onPress={onLoginWithPhone}
          disabled={disabledButton}
          loading={loadingWhenLogIn.loading}
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
