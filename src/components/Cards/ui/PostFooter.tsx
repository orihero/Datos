import {Post} from '@types';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import React, {FC} from 'react';
import AnswerIcon from 'shared/assets/icons/AnswerIcon';
import DownVote from 'shared/assets/icons/DownVote';
import ReplyIcon from 'shared/assets/icons/ReplyIcon';
import ViewIcon from 'shared/assets/icons/ViewIcon';
import {COLORS} from 'shared/constants/colors';
import {HIT_SLOP} from 'shared/styles/globalStyles';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

interface Props {
  post?: Post;
  userId?: string;
  onUpVote?: () => void;
  onDownVote?: () => void;
  onEnterPost?: () => void;
  onEnterPostByAnswer?: () => void;
  onEnterPostByView?: () => void;
  onReplyPress?: () => void;
}

const PostFooter: FC<Props> = ({
  post,
  userId,
  onEnterPost,
  onDownVote,
  onUpVote,
  onEnterPostByAnswer,
  onEnterPostByView,
  onReplyPress,
}) => {
  return (
    <RN.Pressable style={styles.container} onPress={onEnterPost}>
      <RN.View style={styles.left}>
        <RN.View style={[styles.item, {gap: 15}]}>
          <RN.TouchableOpacity onPress={onUpVote} hitSlop={HIT_SLOP}>
            <DownVote
              size={20}
              color={
                post?.upVoteUserIds?.includes(userId as never)
                  ? COLORS.blue
                  : COLORS.white
              }
            />
          </RN.TouchableOpacity>
          <RN.Text
            style={styles.votesCount}
            size="h6"
            font="Medium"
            color={COLORS.white}>
            {post?.votesCount === 0 ? 'Vote' : post?.votesCount}
          </RN.Text>
          <RN.TouchableOpacity
            onPress={onDownVote}
            style={styles.downButton}
            hitSlop={HIT_SLOP}>
            <DownVote
              size={20}
              color={
                post?.downVoteUserIds?.includes(userId as never)
                  ? COLORS.blue
                  : COLORS.white
              }
            />
          </RN.TouchableOpacity>
        </RN.View>
        <RN.TouchableOpacity
          style={[styles.item]}
          onPress={onEnterPostByAnswer}>
          <Spacing height={2} />
          <AnswerIcon color={COLORS.white} size={20} />
          <RN.Text size="h6" font="Medium" color={COLORS.white}>
            {post?.type === 'Question'
              ? post?.answersCount
              : post?.comentsCount}
          </RN.Text>
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          hitSlop={HIT_SLOP}
          style={[styles.item]}
          onPress={onEnterPostByView}>
          <ViewIcon color={COLORS.white} size={20} />
          <RN.Text size="h6" font="Medium" color={COLORS.white}>
            {post?.viewUserIds?.length}
          </RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
      <RN.TouchableOpacity
        onPress={onReplyPress}
        style={[styles.item, {width: 40, borderRadius: 50}]}
        hitSlop={HIT_SLOP}>
        <ReplyIcon color={COLORS.white} size={24} />
      </RN.TouchableOpacity>
    </RN.Pressable>
  );
};

export default PostFooter;

const styles = RN.StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeWidth(15),
    height: normalizeHeight(70),
    borderRadius: 15,
    backgroundColor: COLORS.dargGray,
  },
  downButton: {
    transform: [{rotate: '180deg'}],
  },
  left: {
    gap: 10,
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.white,
    backgroundColor: COLORS.lightGray,
    gap: 5,
    borderRadius: 30,
    paddingHorizontal: normalizeWidth(10),
    height: normalizeHeight(40),
  },
  votesCount: {
    minWidth: normalizeWidth(30),
    textAlign: 'center',
  },
});
