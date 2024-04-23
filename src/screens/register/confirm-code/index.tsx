import {Button} from 'components/Button';
import Container from 'components/Container';
import NumbericCodeEnterInput from 'components/Inputs/NumCodeInput';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import React, {useState} from 'react';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';
import {addAlpha} from 'shared/utils/color';

export default function ConfirmCodeScreen() {
  const [code, setCode] = useState('');
  return (
    <Container background={COLORS.white} isPaddingTop>
      <RN.View style={styles.container}>
        <RN.Text size="h1" font="Bold">
          Please confirm the code!
        </RN.Text>
        <Spacing steps={2} />
        <NumbericCodeEnterInput
          cellCount={6}
          code={code}
          changeCode={setCode}
        />
        <Spacing steps={4} />
        <Button title="Confirm" />
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
