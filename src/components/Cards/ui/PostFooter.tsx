import {Post} from '@types';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import React, {FC} from 'react';
import AnswerIcon from 'shared/assets/icons/AnswerIcon';
import DownVote from 'shared/assets/icons/DownVote';
import ReplyIcon from 'shared/assets/icons/ReplyIcon';
import VerticalMenuIcon from 'shared/assets/icons/VerticalMenu';
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
  onReportPress?: () => void;
  backColor?: string;
  itemBackColor?: string;
  itemBorderColor?: string;
  itemBorderWidth?: number;
  isEnter?: boolean;
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
  onReportPress,
  backColor,
  itemBackColor,
  itemBorderColor,
  itemBorderWidth,
  isEnter,
}) => {
  return (
    <RN.Pressable
      style={[
        styles.container,
        {backgroundColor: backColor ? backColor : COLORS.dargGray},
      ]}
      onPress={onEnterPost}>
      <RN.View style={styles.left}>
        <RN.View
          style={[
            styles.item,
            {
              gap: 15,
              backgroundColor: itemBackColor ? itemBackColor : COLORS.lightGray,
              borderColor: itemBorderColor
                ? itemBorderColor
                : COLORS.transparent,
              borderWidth: itemBorderWidth ? itemBorderWidth : 0,
            },
          ]}>
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
          style={[
            styles.item,
            {
              backgroundColor: itemBackColor ? itemBackColor : COLORS.lightGray,
              borderColor: itemBorderColor
                ? itemBorderColor
                : COLORS.transparent,
              borderWidth: itemBorderWidth ? itemBorderWidth : 0,
            },
          ]}
          onPress={onEnterPostByAnswer}>
          <Spacing height={2} />
          <AnswerIcon color={COLORS.white} size={20} />
          <RN.Text size="h6" font="Medium" color={COLORS.white}>
            {post?.commentsCount}
          </RN.Text>
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          hitSlop={HIT_SLOP}
          style={[
            styles.item,
            {
              backgroundColor: itemBackColor ? itemBackColor : COLORS.lightGray,
              borderColor: itemBorderColor
                ? itemBorderColor
                : COLORS.transparent,
              borderWidth: itemBorderWidth ? itemBorderWidth : 0,
            },
          ]}
          onPress={onEnterPostByView}>
          <ViewIcon color={COLORS.white} size={20} />
          <RN.Text size="h6" font="Medium" color={COLORS.white}>
            {post?.viewUserIds?.length}
          </RN.Text>
        </RN.TouchableOpacity>
        {isEnter && (
          <RN.TouchableOpacity
            onPress={onReplyPress}
            style={[
              styles.item,
              {
                width: 40,
                borderRadius: 40,
                backgroundColor: itemBackColor
                  ? itemBackColor
                  : COLORS.lightGray,
                borderColor: itemBorderColor
                  ? itemBorderColor
                  : COLORS.transparent,
                borderWidth: itemBorderWidth ? itemBorderWidth : 0,
                paddingHorizontal: 0,
              },
            ]}
            hitSlop={HIT_SLOP}>
            <ReplyIcon color={COLORS.white} size={24} />
          </RN.TouchableOpacity>
        )}
      </RN.View>
      <RN.TouchableOpacity
        onPress={onReportPress}
        style={[
          styles.item,
          {
            width: 40,
            borderRadius: 40,
            backgroundColor: itemBackColor ? itemBackColor : COLORS.lightGray,
            borderColor: itemBorderColor ? itemBorderColor : COLORS.transparent,
            borderWidth: itemBorderWidth ? itemBorderWidth : 0,
            paddingHorizontal: 0,
            transform: [{rotate: `${-90}deg`}],
          },
        ]}
        hitSlop={HIT_SLOP}>
        <VerticalMenuIcon color={COLORS.white} size={24} />
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
