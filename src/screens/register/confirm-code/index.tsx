import {Button} from 'components/Button';
import Container from 'components/Container';
import NumbericCodeEnterInput from 'components/Inputs/NumCodeInput';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';
import {useRegister} from 'shared/store/hooks/useRegister';
import {addAlpha} from 'shared/utils/color';
function ConfirmCodeScreen() {
  const {
    state,
    onLoginWithPhoneConfirm,
    onChangeCodeOfConfirm,
    loadingWhenConfirm,
  } = useRegister();
  const codeValue = state.confirmCode.code;
  const disabledButton = !!codeValue && codeValue.length === 6;
  return (
    <Container background={COLORS.white} isPaddingTop>
      <RN.View style={styles.container}>
        <RN.Text size="h1" font="Bold">
          Please confirm the code!
        </RN.Text>
        <Spacing steps={2} />
        <NumbericCodeEnterInput
          cellCount={6}
          code={codeValue}
          changeCode={onChangeCodeOfConfirm}
        />
        <Spacing steps={4} />
        <Button
          title="Confirm"
          disabled={!disabledButton}
          loading={loadingWhenConfirm.loading}
          onPress={onLoginWithPhoneConfirm}
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

export default observer(ConfirmCodeScreen);
