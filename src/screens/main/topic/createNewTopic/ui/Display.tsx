import {Button} from 'components/Button';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React from 'react';
import CameraIcon from 'shared/assets/icons/CameraIcon';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import {launchImageLibrary} from 'react-native-image-picker';
import {ActivityIndicator} from 'react-native';

const floatViewHeight = normalizeHeight(132);

export default observer(() => {
  const {
    onChangeOfNewTopicState,
    state,
    onCreateNewTopic,
    onSelectTopicAvatar,
    loadingWhenCreateTopic,
    loadingWhenPutAvatar,
  } = useRootStore().topic;

  const handlePickImage = async () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 1,
        includeExtra: true,
      },
      async response => {
        if (response.didCancel || response.errorMessage) {
          console.log('User cancelled image picker or there was an error');
        } else {
          const file = response.assets ? response.assets[0] : null;
          onSelectTopicAvatar(file as never);
        }
      },
    );
  };

  return (
    <>
      <Spacing height={20} />
      <RN.View pb={floatViewHeight * 0.6}>
        <RN.View style={styles.container}>
          <RN.View style={styles.imageBox}>
            <RN.Image
              source={{uri: state.newAvatar.uri}}
              style={styles.image}
            />
            {loadingWhenPutAvatar.loading ? (
              <ActivityIndicator color={COLORS.blue} size={32} />
            ) : (
              <RN.TouchableOpacity
                style={styles.iconButton}
                onPress={handlePickImage}>
                <CameraIcon size={32} color={COLORS.white} />
              </RN.TouchableOpacity>
            )}
          </RN.View>
        </RN.View>
        <Spacing height={20} />
        <RN.View>
          <RN.TextInput
            onChangeText={e => onChangeOfNewTopicState('title', e)}
            value={state.newTopicState.title}
            style={styles.input}
            placeholder="Title"
            placeholderTextColor={COLORS.textGray}
          />
          <Spacing height={20} />
          <RN.TextInput
            onChangeText={e => onChangeOfNewTopicState('description', e)}
            value={state.newTopicState.description}
            placeholder="Description"
            style={styles.inputDesc}
            placeholderTextColor={COLORS.textGray}
            multiline
          />
          <Spacing height={20} />
          <Button
            title="Save"
            disabled={
              !state.newTopicState.title.length ||
              !state.newTopicState.description.length
            }
            loading={loadingWhenCreateTopic.loading}
            onPress={onCreateNewTopic}
          />
        </RN.View>
      </RN.View>
    </>
  );
});

const styles = RN.StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: normalizeHeight(200),
    width: normalizeWidth(200),
    backgroundColor: COLORS.white,
    borderRadius: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 100,
    position: 'absolute',
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
  inputDesc: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 30,
    color: COLORS.white,
    height: normalizeHeight(100),
    paddingHorizontal: normalizeWidth(20),
    paddingVertical: normalizeHeight(20),
  },
});
