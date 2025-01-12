import {TextInput} from 'components/Inputs/TextInput';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import React, {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CameraIcon from 'shared/assets/icons/CameraIcon';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {CoreStyle} from 'shared/styles/globalStyles';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import firestore from '@react-native-firebase/firestore';
import {observer} from 'mobx-react-lite';
import {useUser} from 'shared/store/hooks/useUser';
import Language from '../../language/Language';

const floatViewHeight = normalizeHeight(132);

export default observer(() => {
  const {t} = useTranslation();
  const {user} = useUser();
  const {state, onChangeOfUserState} = useRootStore().user;
  const {show} = useRootStore().visible;
  const [nicknameLoading, setNicknameLoading] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const [nicknameValid, setNicknameValid] = React.useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isLoading = useMemo(
    () => !state.userState.userImageUrl,
    [state.userState.userImageUrl],
  );

  const checkNicknameAvailability = useCallback(
    async (nickname: string) => {
      // Check if the entered nickname is the same as the original nickname
      if (state.userState.nickname === user.nickname) {
        setNicknameError('');
        setNicknameValid(true);
        return;
      }

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
    [state.userState.nickname, t, user.nickname],
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={CoreStyle.flexGrow1}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <Spacing height={20} />
      <RN.View pb={floatViewHeight * 0.6}>
        <RN.Pressable style={styles.container} onPress={dismissKeyboard}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.black} />
          ) : (
            <>
              <RN.Image
                source={{uri: state.userState.userImageUrl}}
                style={styles.image}
              />
              <RN.TouchableOpacity style={styles.iconButton}>
                <CameraIcon size={32} color={COLORS.white} />
              </RN.TouchableOpacity>
            </>
          )}
        </RN.Pressable>
        <Spacing height={20} />
        <RN.View>
          <RN.Text style={styles.label}>{t('first_name')}</RN.Text>
          <Spacing steps={0.5} />
          <TextInput
            onChangeText={e => onChangeOfUserState('firstName', e)}
            value={state.userState.firstName}
            inputStyle={styles.input}
          />
          <Spacing steps={2} />
          <RN.Text style={styles.label}>{t('last_name')}</RN.Text>
          <Spacing steps={0.5} />
          <TextInput
            onChangeText={e => onChangeOfUserState('lastName', e)}
            value={state.userState.lastName}
            inputStyle={styles.input}
          />
          <Spacing steps={2} />
          <RN.Text style={styles.label}>{t('nickname')}</RN.Text>
          <Spacing steps={0.5} />
          <TextInput
            value={state.userState.nickname}
            inputStyle={styles.input}
            placeholder={`${t('enter_nickname')}`}
            onChangeText={value => {
              onChangeOfUserState('nickname', value);
              checkNicknameAvailability(value);
            }}
          />
          {nicknameLoading && (
            <ActivityIndicator size="small" color={COLORS.blue} />
          )}
          {nicknameError ? (
            <RN.Text style={styles.errorText}>{nicknameError}</RN.Text>
          ) : nicknameValid ? (
            <RN.Text style={styles.successText}>{t('nickname_succes')}</RN.Text>
          ) : null}
        </RN.View>
        <Spacing steps={2} />
        <RN.TouchableOpacity
          style={styles.deleteAccBtn}
          onPress={() => show('deleteAccountConfirmation')}>
          <RN.Text color={COLORS.tomate}>Delete account</RN.Text>
        </RN.TouchableOpacity>
        <Spacing steps={2} />
        <Language />
      </RN.View>
    </KeyboardAwareScrollView>
  );
});

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: normalizeHeight(270),
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: COLORS.white,
    paddingLeft: normalizeWidth(10),
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
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 100,
    position: 'absolute',
  },
  floatFooter: {
    position: 'absolute',
    zIndex: -1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    bottom: 0,
    backgroundColor: COLORS.dargGray,
    width: '100%',
    height: floatViewHeight,
    borderRadius: 40,
    paddingHorizontal: 40,
    paddingBottom: normalizeHeight(16),
  },
  item: {
    alignItems: 'center',
  },
  lightSubTitle: {
    fontFamily: FontFamily.Medium,
    color: COLORS.darkGray2,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: FontFamily.Medium,
    color: COLORS.white,
  },
  iconButton: {
    backgroundColor: COLORS.lightGray2,
    width: normalizeWidth(54),
    aspectRatio: 1,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    color: COLORS.white,
    paddingHorizontal: normalizeWidth(15),
    borderRadius: 15,
    width: '100%',
  },
  deleteAccBtn: {
    paddingVertical: normalizeHeight(10),
    alignItems: 'center',
  },
});
