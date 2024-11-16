import {useRoute} from '@react-navigation/native';
import {Button} from 'components/Button';
import {CheckboxButton} from 'components/CheckboxButton';
import Container from 'components/Container';
import {TextInput} from 'components/Inputs/TextInput';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {ActivityIndicator} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import StorageApi from 'shared/api/storage.api';
import {DefaultUserPngImage} from 'shared/assets/images';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';
import {useAppViewInsets} from 'shared/hooks/useAppViewInsets';
import useVisibility from 'shared/hooks/useVisibility';
import {useRegister} from 'shared/store/hooks/useRegister';
import {CoreStyle} from 'shared/styles/globalStyles';
import {addAlpha} from 'shared/utils/color';
import {pickImageFromDevice} from 'shared/utils/image-picker';

function SetupScreen() {
  const {paddingBottom} = useAppViewInsets();
  const {state, onChangeOfSetup, onSetUpFinish, loadingWhenOnFinish} =
    useRegister();
  const imageUploadLoading = useVisibility();
  const params = useRoute().params as {uid: string};

  const {firstName, lastName, neckname, userImageUrl, gender} = state.setup;
  const buttonDisabled = !(firstName && lastName && neckname);

  const onUploadImage = useCallback(async () => {
    try {
      imageUploadLoading.show();
      const result = await pickImageFromDevice({
        width: 400,
        height: 400,
        withCircleOverlay: true,
      });

      const url = await StorageApi.uploadImage({
        file: result,
      });

      if (url) {
        onChangeOfSetup('userImageUrl', url);
        imageUploadLoading.hide();
      }
    } catch (err) {
      console.log(['[Error-onUploadImage]:', err]);
    } finally {
      imageUploadLoading.hide();
    }
  }, [imageUploadLoading, onChangeOfSetup]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={CoreStyle.flexGrow1}>
      <Container
        background={COLORS.white}
        isPaddingTop
        Footer={
          <RN.View ph={10}>
            <Button
              title="Finish"
              disabled={buttonDisabled}
              loading={loadingWhenOnFinish.loading}
              onPress={() => onSetUpFinish(params.uid)}
            />
            <Spacing height={paddingBottom} />
          </RN.View>
        }>
        <RN.View style={styles.container}>
          <RN.Text style={styles.title}>
            Congratulations! you have successfully registered! 🎉
          </RN.Text>
          <Spacing steps={6} />
          <RN.Text style={styles.subTitle}>
            Please fill out the form now!
          </RN.Text>
          <Spacing steps={4} />

          <RN.View style={styles.formContainer}>
            <RN.View style={styles.userImageContainer}>
              <RN.Image
                source={
                  userImageUrl === null
                    ? DefaultUserPngImage
                    : {uri: userImageUrl}
                }
                resizeMode="cover"
                style={styles.defaultUserImage}
              />
              <RN.TouchableOpacity
                style={[
                  styles.uploadImageButton,
                  !!userImageUrl && styles.uploadImageButtonDisabled,
                ]}
                disabled={!!userImageUrl}
                onPress={onUploadImage}>
                {imageUploadLoading.visible ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                  <RN.Text>Upload Image</RN.Text>
                )}
              </RN.TouchableOpacity>
            </RN.View>
            <TextInput
              value={firstName}
              placeholder="Enter firstname"
              onChangeText={value => onChangeOfSetup('firstName', value)}
            />
            <TextInput
              value={lastName}
              placeholder="Enter lastname"
              onChangeText={value => onChangeOfSetup('lastName', value)}
            />
            <TextInput
              value={neckname}
              placeholder="Enter neckname"
              onChangeText={value => onChangeOfSetup('neckname', value)}
            />

            <RN.TouchableOpacity
              style={styles.checkbox}
              onPress={() => onChangeOfSetup('gender', 'male')}>
              <CheckboxButton value={gender === 'male'} />
              <RN.Text style={styles.checkboxLabel}>Male</RN.Text>
            </RN.TouchableOpacity>
            <RN.TouchableOpacity
              style={styles.checkbox}
              onPress={() => onChangeOfSetup('gender', 'female')}>
              <CheckboxButton value={gender === 'female'} />
              <RN.Text style={styles.checkboxLabel}>Female</RN.Text>
            </RN.TouchableOpacity>
          </RN.View>
        </RN.View>
      </Container>
    </KeyboardAwareScrollView>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: FontFamily.Bold,
    textAlign: 'center',
    color: COLORS.black,
  },
  subTitle: {
    fontSize: 28,
    fontFamily: FontFamily.Medium,
    color: COLORS.black,
    textAlign: 'center',
  },
  uploadImageButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    backgroundColor: addAlpha(COLORS.black, 0.2),
    marginTop: 4,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
  },
  uploadImageButtonDisabled: {
    opacity: 0.3,
  },
  userImageContainer: {
    alignItems: 'center',
  },
  defaultUserImage: {
    width: 130,
    height: 130,
    borderRadius: 100,
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
  formContainer: {
    width: '100%',
    rowGap: 10,
    paddingTop: 20,
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: FontFamily.Medium,
    color: addAlpha(COLORS.black, 0.8),
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  checkboxGroup: {
    rowGap: 20,
  },
});

export default observer(SetupScreen);
