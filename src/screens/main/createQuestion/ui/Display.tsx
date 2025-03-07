import RN from 'components/RN';
import React, {useCallback, useEffect, useRef} from 'react';
import {COLORS} from 'shared/constants/colors';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import {observer} from 'mobx-react-lite';
import CrossRedCircleSmallIcon from 'shared/assets/icons/CrossRedCircleSmallIcon';
import {TextInput} from 'react-native';
import VideoContent from 'components/VideoContent/VideoContent';
import {useTranslation} from 'react-i18next';

export default observer(() => {
  const {t} = useTranslation();
  const {onChangeOfNewPostState, state, onRemoveNewPostMediaUrl} =
    useRootStore().post;

  const titleInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const renderMedia = useCallback(() => {
    return state.newPostMediaUrl.uri ? (
      <RN.View style={styles.media}>
        {state.newPostMediaUrl.type === 'image' ? (
          <RN.Image
            style={styles.image}
            source={{uri: state.newPostMediaUrl.uri}}
          />
        ) : (
          <VideoContent uri={state.newPostMediaUrl?.uri} height={200} />
        )}
        <RN.TouchableOpacity
          style={styles.removeMedia}
          onPress={onRemoveNewPostMediaUrl}>
          <CrossRedCircleSmallIcon color={COLORS.lightGray} size={32} />
        </RN.TouchableOpacity>
      </RN.View>
    ) : null;
  }, [
    onRemoveNewPostMediaUrl,
    state.newPostMediaUrl.type,
    state.newPostMediaUrl.uri,
  ]);

  return (
    <RN.Pressable style={styles.container}>
      <RN.TextInput
        ref={titleInputRef}
        onChangeText={e => onChangeOfNewPostState('title', e)}
        value={state.newPostState.title}
        placeholder={t('title') as never}
        placeholderTextColor={COLORS.textGray}
        style={styles.title}
        multiline
      />
      {renderMedia()}
      <RN.TextInput
        onChangeText={e => onChangeOfNewPostState('body', e)}
        value={state.newPostState.body}
        placeholder={`${t('body')} ${t('optional')}`}
        placeholderTextColor={COLORS.textGray}
        style={styles.body}
        multiline
      />
    </RN.Pressable>
  );
});

const styles = RN.StyleSheet.create({
  container: {
    gap: 15,
  },
  title: {
    fontSize: normalizeHeight(26),
    color: COLORS.white,
  },
  body: {
    fontSize: normalizeHeight(16),
    color: COLORS.white,
  },
  media: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: normalizeHeight(400),
  },
  removeMedia: {
    backgroundColor: COLORS.white,
    borderRadius: 50,
    aspectRatio: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: normalizeHeight(5),
    right: normalizeWidth(10),
  },
});
