import RN from 'components/RN';
import React, {useCallback} from 'react';
import {COLORS} from 'shared/constants/colors';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight} from 'shared/utils/dimensions';
import ReanimatedCarousel from 'components/ReanimatedCarousel/ReanimatedCarousel';
import {observer} from 'mobx-react-lite';

export default observer(() => {
  const {onChangeOfNewPostState, state} = useRootStore().post;

  const renderMedia = useCallback(() => {
    return state.newPostMediaUrls?.length ? (
      <ReanimatedCarousel
        data={state.newPostMediaUrls.map(item => item.uri) as never}
      />
    ) : null;
  }, [state.newPostMediaUrls]);

  return (
    <RN.Pressable style={styles.container}>
      <RN.TextInput
        onChangeText={e => onChangeOfNewPostState('title', e)}
        value={state.newPostState.title}
        placeholder="Title"
        placeholderTextColor={COLORS.textGray}
        style={styles.title}
        multiline
      />
      {renderMedia()}
      <RN.TextInput
        onChangeText={e => onChangeOfNewPostState('title', e)}
        value={state.newPostState.body}
        placeholder="Body (Optional)"
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
  },
});
