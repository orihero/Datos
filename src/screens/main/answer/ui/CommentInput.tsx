import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import CrossRedCircleSmallIcon from 'shared/assets/icons/CrossRedCircleSmallIcon';
import ReplyIcon from 'shared/assets/icons/ReplyIcon';
import SendPlaneIcon from 'shared/assets/icons/SendPlaceIcon';
import {COLORS} from 'shared/constants/colors';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

interface Props {
  onSend?: () => void;
  onPressIn?: () => void;
  inputRef?: any;
}

const CommentInput: FC<Props> = ({onSend, onPressIn, inputRef}) => {
  const {onChangeOfNewAnswerState, state, clearReplyCommentState} =
    useRootStore().post;

  return (
    <RN.View style={styles.container}>
      {state.isReply ? (
        <RN.View style={styles.replyBox}>
          <RN.View style={styles.replyLeft}>
            <ReplyIcon color={COLORS.white} />
            {state.replyComment?.user?.userImageUrl && (
              <RN.Image
                style={styles.userAvatar}
                source={{uri: state.replyComment.user?.userImageUrl}}
              />
            )}
            <RN.View style={styles.replyTexts}>
              <RN.Text color={COLORS.white} size="h6">
                {state.replyComment?.user?.firstName}
                {state.replyComment?.user?.lastName}
              </RN.Text>
              <RN.Text color={COLORS.white} style={{fontWeight: 'bold'}}>
                {state.replyComment?.title.length > 70
                  ? state.replyComment?.title.slice(0, 70) + '...'
                  : state.replyComment?.title}
              </RN.Text>
            </RN.View>
          </RN.View>
          <RN.TouchableOpacity onPress={clearReplyCommentState}>
            <CrossRedCircleSmallIcon color={COLORS.white} size={24} />
          </RN.TouchableOpacity>
        </RN.View>
      ) : null}
      <RN.View style={styles.inputBox}>
        <RN.TextInput
          style={styles.input}
          placeholder={state.postType === 'Question' ? 'Answer' : 'Comment'}
          placeholderTextColor={COLORS.textGray}
          value={state.newAnswerState.title}
          onChangeText={e => onChangeOfNewAnswerState('title', e)}
          onPressIn={onPressIn}
          ref={inputRef}
        />
        <RN.TouchableOpacity style={styles.sendBtn} onPress={onSend}>
          <SendPlaneIcon size={28} color={COLORS.white} />
        </RN.TouchableOpacity>
      </RN.View>
    </RN.View>
  );
};

export default observer(CommentInput);

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: COLORS.dargGray,
    paddingHorizontal: normalizeWidth(15),
    paddingBottom: normalizeHeight(20),
  },
  inputBox: {
    paddingTop: normalizeHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '85%',
    backgroundColor: COLORS.inputGray,
    paddingHorizontal: normalizeWidth(20),
    paddingVertical: normalizeHeight(20),
    borderRadius: 15,
    color: COLORS.white,
  },
  sendBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: normalizeWidth(12),
    paddingVertical: normalizeHeight(12),
    borderRadius: 12,
  },

  userBox: {
    paddingTop: normalizeHeight(10),
    paddingHorizontal: normalizeWidth(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  replyBox: {
    paddingTop: normalizeHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  replyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  replyTexts: {
    width: '74%',
  },
  userAvatar: {
    width: normalizeWidth(40),
    height: normalizeHeight(40),
    borderRadius: 40,
  },
});
