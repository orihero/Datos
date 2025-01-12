import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {DaysSelector} from './DaysSelector';
import PollOption from './PollOptions';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import PlusIcon from 'shared/assets/icons/PlusIcon';
import {COLORS} from 'shared/constants/colors';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import RN from 'components/RN';
import VideoContent from 'components/VideoContent/VideoContent';
import CrossRedCircleSmallIcon from 'shared/assets/icons/CrossRedCircleSmallIcon';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import {useTranslation} from 'react-i18next';

export default observer(() => {
  const {t} = useTranslation();
  const {state, onChangeOfNewPostState, onRemoveNewPostMediaUrl} =
    useRootStore().post;
  const [showDaysSelector, setShowDaysSelector] = useState(false);
  const titleInputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Ekran ochilganda fokus berish
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const addOption = () => {
    if (state.newPostState.pollOptions.length < 4) {
      onChangeOfNewPostState('pollOptions', [
        ...state.newPostState.pollOptions,
        {
          id: String(state.newPostState.pollOptions.length + 1),
          text: '',
          votesCount: 0,
          votedUserIds: [],
        },
      ]);
    }
  };

  const updateOption = (id: string, text: string) => {
    onChangeOfNewPostState(
      'pollOptions',
      state.newPostState.pollOptions.map(opt =>
        opt.id === id ? {...opt, text} : opt,
      ),
    );
  };

  const removeOption = (id: string) => {
    if (state.newPostState.pollOptions.length > 2) {
      onChangeOfNewPostState(
        'pollOptions',
        state.newPostState.pollOptions.filter(opt => opt.id !== id),
      );
    }
  };

  const handleReorder = (fromIndex: number, offset: number) => {
    const toIndex = Math.max(
      0,
      Math.min(fromIndex + offset, state.newPostState.pollOptions.length - 1),
    );
    if (fromIndex === toIndex) {
      return;
    }

    const newOptions = [...state.newPostState.pollOptions];
    const [movedOption] = newOptions.splice(fromIndex, 1);
    newOptions.splice(toIndex, 0, movedOption);
    onChangeOfNewPostState('pollOptions', newOptions);
  };

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
    <GestureHandlerRootView style={styles.container}>
      <TextInput
        ref={titleInputRef}
        value={state.newPostState.title}
        onChangeText={e => onChangeOfNewPostState('title', e)}
        placeholder={`${t('title')}`}
        placeholderTextColor={COLORS.textGray}
        style={styles.title}
        multiline
      />
      {renderMedia()}
      <TextInput
        value={state.newPostState.body}
        onChangeText={e => onChangeOfNewPostState('body', e)}
        placeholder={`${t('body')} ${t('optional')}`}
        placeholderTextColor={COLORS.textGray}
        style={styles.body}
        multiline
      />
      <Spacing height={10} />
      <View style={styles.pollBox}>
        <View style={styles.pollHeader}>
          <TouchableOpacity
            style={styles.daysButton}
            onPress={() => setShowDaysSelector(true)}>
            <Text style={[styles.pollEndsText, {color: COLORS.textGray}]}>
              {t('poll_ends')}
            </Text>
            <Text style={styles.pollEndsText}>
              {state.newPostState.pollEndDays}{' '}
              {state.newPostState.pollEndDays === 1
                ? `${t('day')}`
                : `${t('days')}`}
            </Text>
            <ArrowDownIcon size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.optionsBox}>
          {state.newPostState.pollOptions.map((option, index) => (
            <PollOption
              key={option.id}
              id={option.id}
              text={option.text}
              onChangeText={text => updateOption(option.id, text)}
              onRemove={() => removeOption(option.id)}
              canRemove={state.newPostState.pollOptions.length > 2}
              onDragEnd={offset => handleReorder(index, offset)}
              index={index}
            />
          ))}

          {state.newPostState.pollOptions.length < 4 && (
            <Pressable style={styles.addOption} onPress={addOption}>
              <PlusIcon size={24} color={COLORS.textGray} />
              <Text style={styles.addOptionText}>{t('add_optin')}</Text>
            </Pressable>
          )}
        </View>
      </View>
      <DaysSelector
        visible={showDaysSelector}
        onClose={() => setShowDaysSelector(false)}
        onSelect={e => onChangeOfNewPostState('pollEndDays', e)}
        selectedDays={state.newPostState.pollEndDays}
      />
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  title: {
    fontSize: 26,
    color: COLORS.white,
    padding: 0,
  },
  body: {
    fontSize: 16,
    color: COLORS.white,
    padding: 0,
  },
  pollBox: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    padding: 20,
    borderRadius: 20,
  },
  pollHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  daysButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pollEndsText: {
    color: COLORS.white,
    fontSize: 16,
  },
  optionsBox: {
    gap: 10,
  },
  addOption: {
    backgroundColor: COLORS.dargGray,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addOptionText: {
    color: COLORS.textGray,
    marginLeft: 10,
    fontSize: 16,
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
