import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {COLORS} from 'shared/constants/colors';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

export default observer(() => {
  const {t} = useTranslation();
  const {onChangeOfNewPostState, state} = useRootStore().post;
  const onChangeQuestion = () => {
    onChangeOfNewPostState('type', 'Question');
  };

  const onChangePost = () => {
    onChangeOfNewPostState('type', 'Post');
  };
  const onChangePoll = () => {
    onChangeOfNewPostState('type', 'Poll');
  };

  return (
    <>
      <Spacing height={10} />
      <RN.View style={styles.group}>
        <RN.TouchableOpacity
          onPress={onChangeQuestion}
          style={[
            styles.button,
            state.newPostState.type === 'Question' && styles.activeButton,
          ]}>
          <RN.Text style={styles.buttonText}>{t('question')}</RN.Text>
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          onPress={onChangePost}
          style={[
            styles.button,
            state.newPostState.type === 'Post' && styles.activeButton,
          ]}>
          <RN.Text style={styles.buttonText}>{t('post')}</RN.Text>
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          onPress={onChangePoll}
          style={[
            styles.button,
            state.newPostState.type === 'Poll' && styles.activeButton,
          ]}>
          <RN.Text style={styles.buttonText}>{t('poll')}</RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
      <Spacing height={20} />
    </>
  );
});

const styles = RN.StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(8),
    paddingVertical: normalizeHeight(6),
    backgroundColor: COLORS.dargGray,
    borderRadius: 54,
    borderWidth: 2,
    borderColor: COLORS.dargGray,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
  },
  button: {
    height: normalizeHeight(45),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  activeButton: {
    backgroundColor: COLORS.blue,
  },
});
