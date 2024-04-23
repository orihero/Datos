import {Button} from 'components/Button';
import Container from 'components/Container';
import {PhoneInput} from 'components/Inputs/PhoneInput';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import React from 'react';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';
import {addAlpha} from 'shared/utils/color';

export default function LoginScreen() {
  return (
    <Container background={COLORS.white} isPaddingTop>
      <RN.View style={styles.container}>
        <RN.Text size="h1" font="Bold">
          Enter your mobile number!
        </RN.Text>
        <Spacing steps={2} />
        <PhoneInput />
        <Spacing steps={4} />
        <Button title="Log In" />
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
