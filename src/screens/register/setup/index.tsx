import {Button} from 'components/Button';
import {CheckboxButton} from 'components/CheckboxButton';
import Container from 'components/Container';
import {TextInput} from 'components/Inputs/TextInput';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import StorageApi from 'shared/api/storage.api';
import CameraIcon from 'shared/assets/icons/CameraIcon';
import {DefaultUserPngImage} from 'shared/assets/images';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';
import {useAppViewInsets} from 'shared/hooks/useAppViewInsets';
import useVisibility from 'shared/hooks/useVisibility';
import {useRegister} from 'shared/store/hooks/useRegister';
import {CoreStyle} from 'shared/styles/globalStyles';
import {addAlpha} from 'shared/utils/color';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import {pickImageFromDevice} from 'shared/utils/image-picker';
import firestore from '@react-native-firebase/firestore';
import {useTranslation} from 'react-i18next';
import TripleHeader from 'components/TripleHeader/TripleHeader';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import NavigationService from 'shared/navigation/NavigationService';

const SetupScreen = () => {
  const {t} = useTranslation();
  const {paddingBottom} = useAppViewInsets();
  const {state, onChangeOfSetup, onSetUpFinish, loadingWhenOnFinish} =
    useRegister();
  const imageUploadLoading = useVisibility();
  const [nicknameLoading, setNicknameLoading] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const [nicknameValid, setNicknameValid] = React.useState(false);

  const {firstName, lastName, nickname, userImageUrl, gender} = state.setup;
  const buttonDisabled = !(firstName && lastName && nickname && nicknameValid);

  const onUploadImage = useCallback(async () => {
    try {
      imageUploadLoading.show();
      const result = await pickImageFromDevice({
        width: 400,
        height: 400,
        withCircleOverlay: true,
      });
      console.log('result file', result);

      const url = await StorageApi.uploadImageTwo({
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

  const checkNicknameAvailability = useCallback(
    async (nickname: string) => {
      if (!nickname) {
        setNicknameError('');
        setNicknameValid(false);
        return;
      }

      setNicknameLoading(true);
      setNicknameError('');
      setNicknameValid(false);

      try {
        const usersSnapshot = await firestore()
          .collection('users')
          .where('nickname', '==', nickname)
          .get();

        if (!usersSnapshot.empty) {
          setNicknameError(`${t('nickname_error')}`);
        } else {
          setNicknameValid(true);
        }
      } catch (err) {
        console.error('[Error-checkNicknameAvailability]:', err);
        setNicknameError('An error occurred while checking the nickname');
      } finally {
        setNicknameLoading(false);
      }
    },
    [t],
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={CoreStyle.flexGrow1}
      style={{backgroundColor: COLORS.black}}>
      <Container
        Header={
          <TripleHeader
            title={`${t('setup')}`}
            leftItem={
              <RN.TouchableOpacity onPress={() => NavigationService.goBack()}>
                <ArrowLeftIcon color={COLORS.white} size={22} />
              </RN.TouchableOpacity>
            }
          />
        }
        Footer={
          <RN.View ph={10}>
            <Button
              title={t('finish')}
              disabled={buttonDisabled}
              loading={loadingWhenOnFinish.loading}
              onPress={onSetUpFinish}
            />
            <Spacing height={paddingBottom} />
          </RN.View>
        }>
        <RN.View style={styles.container}>
          <RN.Text style={styles.title}>{t('congratulations_text')}</RN.Text>
          <Spacing steps={2} />
          <RN.Text style={styles.subTitle}>{t('please_fill_out')}</RN.Text>
          <Spacing steps={2} />

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

              {imageUploadLoading.visible ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <RN.TouchableOpacity
                  style={styles.iconButton}
                  onPress={onUploadImage}>
                  <CameraIcon size={32} color={COLORS.white} />
                </RN.TouchableOpacity>
              )}
            </RN.View>
            <Spacing height={5} />
            <RN.Text style={styles.label}>{t('first_name')}</RN.Text>
            <TextInput
              inputStyle={styles.input}
              value={firstName}
              placeholder={`${t('enter_first_name')}`}
              placeholderTextColor={COLORS.textGray}
              onChangeText={value => onChangeOfSetup('firstName', value)}
            />
            <Spacing height={5} />
            <RN.Text style={styles.label}>{t('last_name')}</RN.Text>
            <TextInput
              value={lastName}
              inputStyle={styles.input}
              placeholder={`${t('enter_last_name')}`}
              placeholderTextColor={COLORS.textGray}
              onChangeText={value => onChangeOfSetup('lastName', value)}
            />
            <Spacing height={5} />
            <RN.Text style={styles.label}>{t('nickname')}</RN.Text>
            <TextInput
              value={nickname}
              inputStyle={styles.input}
              placeholder={`${t('enter_nickname')}`}
              placeholderTextColor={COLORS.textGray}
              onChangeText={value => {
                onChangeOfSetup('nickname', value);
                checkNicknameAvailability(value);
              }}
            />
            {nicknameLoading && (
              <ActivityIndicator size="small" color={COLORS.blue} />
            )}
            {nicknameError ? (
              <RN.Text style={styles.errorText}>{nicknameError}</RN.Text>
            ) : nicknameValid ? (
              <RN.Text style={styles.successText}>
                {t('nickname_succes')}
              </RN.Text>
            ) : null}
            <Spacing height={5} />
            <RN.TouchableOpacity
              style={styles.checkbox}
              onPress={() => onChangeOfSetup('gender', 'male')}>
              <CheckboxButton value={gender === 'male'} />
              <RN.Text style={styles.checkboxLabel}>{t('male')}</RN.Text>
            </RN.TouchableOpacity>
            <RN.TouchableOpacity
              style={styles.checkbox}
              onPress={() => onChangeOfSetup('gender', 'female')}>
              <CheckboxButton value={gender === 'female'} />
              <RN.Text style={styles.checkboxLabel}>{t('female')}</RN.Text>
            </RN.TouchableOpacity>
          </RN.View>
        </RN.View>
      </Container>
    </KeyboardAwareScrollView>
  );
};

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
    color: COLORS.white,
  },
  subTitle: {
    fontSize: 28,
    fontFamily: FontFamily.Medium,
    color: COLORS.white,
    textAlign: 'center',
  },
  userImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: normalizeHeight(160),
  },
  defaultUserImage: {
    width: 150,
    height: 150,
    borderRadius: 150,
    resizeMode: 'contain',
    position: 'absolute',
  },
  label: {
    paddingLeft: normalizeWidth(10),
    color: COLORS.white,
  },
  input: {
    width: '100%',
    fontSize: normalizeHeight(16),
    paddingHorizontal: normalizeWidth(10),
    fontFamily: FontFamily.Regular,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 15,
    color: COLORS.white,
  },
  successText: {
    color: 'green',
    marginTop: 5,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
  formContainer: {
    width: '100%',
    rowGap: 5,
    paddingTop: 20,
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: FontFamily.Medium,
    color: COLORS.textGray,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  checkboxGroup: {
    rowGap: 20,
  },
  iconButton: {
    backgroundColor: COLORS.lightGray2,
    width: normalizeWidth(54),
    aspectRatio: 1,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default observer(SetupScreen);
