import {TextInput} from 'components/Inputs/TextInput';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import React, {useMemo} from 'react';
import {ActivityIndicator} from 'react-native';
import CameraIcon from 'shared/assets/icons/CameraIcon';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

const floatViewHeight = normalizeHeight(132);

export default () => {
  const {state, onChangeOfUserState} = useRootStore().user;

  const isLoading = useMemo(
    () => !state.userState.userImageUrl,
    [state.userState.userImageUrl],
  );

  return (
    <>
      <Spacing height={20} />
      <RN.View pb={floatViewHeight * 0.6}>
        <RN.View style={styles.container}>
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
        </RN.View>
        <Spacing height={20} />
        <RN.View>
          <TextInput
            onChangeText={e => onChangeOfUserState('firstName', e)}
            value={state.userState.firstName}
            inputStyle={styles.input}
          />
          <Spacing height={10} />
          <TextInput
            onChangeText={e => onChangeOfUserState('lastName', e)}
            value={state.userState.lastName}
            inputStyle={styles.input}
          />
          <Spacing height={10} />
          <TextInput
            onChangeText={e => onChangeOfUserState('nickname', e)}
            value={state.userState.nickname}
            inputStyle={styles.input}
          />
        </RN.View>
      </RN.View>
    </>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: normalizeHeight(270),
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingHorizontal: normalizeWidth(20),
    paddingVertical: normalizeHeight(20),
    borderRadius: 30,
    width: '100%',
  },
});
