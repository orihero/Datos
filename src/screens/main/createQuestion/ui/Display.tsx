import RN from 'components/RN';
import React from 'react';
import {Keyboard} from 'react-native';
import {COLORS} from 'shared/constants/colors';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight} from 'shared/utils/dimensions';

export default () => {
  const {onChangeOfNewPostState, state} = useRootStore().post;

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
};

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
