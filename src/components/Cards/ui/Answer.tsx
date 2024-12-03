import {AnswerType, CommentType} from '@types';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React, {FC, useCallback} from 'react';
import CheckboxIcon from 'shared/assets/icons/CheckboxIcon';
import DownVote from 'shared/assets/icons/DownVote';
import ReplyIcon from 'shared/assets/icons/ReplyIcon';
import {COLORS} from 'shared/constants/colors';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {timeSince} from 'shared/utils/date';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

interface Props {
  onUpVote?: () => void;
  onDownVote?: () => void;
  answer: AnswerType;
  onReplyBtnPress?: () => void;
  onSelectTrueAnswerPress?: () => void;
  postUserId?: string;
}

const Answer: FC<Props> = ({
  answer,
  onDownVote,
  onUpVote,
  onReplyBtnPress,
  postUserId,
  onSelectTrueAnswerPress,
}) => {
  const {userId} = useRootStore().local;

  const renderComments = useCallback(({item}: {item: CommentType}) => {
    return (
      <RN.View style={styles.commentUser}>
        {item?.user?.userImageUrl && (
          <RN.Image
            style={styles.commentUserAvatar}
            source={{uri: item.user?.userImageUrl}}
          />
        )}
        <RN.View style={styles.commentUserInfo}>
          <RN.View style={styles.commentUserName}>
            <RN.Text color={COLORS.white} style={{fontSize: 11}}>
              {item?.user?.nickname}
            </RN.Text>
            <RN.Text color={COLORS.textGray} style={{fontSize: 10}}>
              {timeSince(item.createdAt)}
            </RN.Text>
          </RN.View>
          <RN.Text
            color={COLORS.white}
            style={{fontSize: 13, fontWeight: 'bold'}}>
            {item.title}
          </RN.Text>
        </RN.View>
      </RN.View>
    );
  }, []);

  const renderSeparator = () => <Spacing height={15} />;

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.topBox}>
        <RN.View fd={'row'} jc={'space-between'} ai="center">
          <RN.View style={styles.userBox}>
            {answer?.user?.userImageUrl && (
              <RN.Image
                style={styles.userAvatar}
                source={{uri: answer.user?.userImageUrl}}
              />
            )}
            <RN.View>
              <RN.Text color={COLORS.white} size="h4">
                {answer?.user?.nickname}
              </RN.Text>
              <RN.Text color={COLORS.textGray} size="h6">
                {timeSince(answer.createdAt)}
              </RN.Text>
            </RN.View>
          </RN.View>
          {postUserId === userId && (
            <RN.TouchableOpacity onPress={onSelectTrueAnswerPress}>
              {answer.isCorrect ? (
                <CheckboxIcon size={20} color={COLORS.blue} />
              ) : (
                <RN.View style={styles.check} />
              )}
            </RN.TouchableOpacity>
          )}
          {postUserId !== userId && answer.isCorrect && (
            <CheckboxIcon size={20} color={COLORS.blue} />
          )}
        </RN.View>
        <RN.Text size="h2" font="Medium" color={COLORS.white}>
          {answer?.title}
        </RN.Text>
      </RN.View>
      <RN.View style={styles.answer}>
        <RN.View style={styles.bottom}>
          <RN.View style={[styles.item, {gap: 15}]}>
            <RN.TouchableOpacity onPress={onUpVote}>
              <DownVote
                size={20}
                color={
                  answer?.upVoteUserIds?.includes(userId as never)
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
              {answer?.votesCount === 0 ? 'Vote' : answer?.votesCount}
            </RN.Text>
            <RN.TouchableOpacity onPress={onDownVote} style={styles.downButton}>
              <DownVote
                size={20}
                color={
                  answer?.downVoteUserIds?.includes(userId as never)
                    ? COLORS.blue
                    : COLORS.white
                }
              />
            </RN.TouchableOpacity>
          </RN.View>
          <RN.TouchableOpacity style={styles.item} onPress={onReplyBtnPress}>
            <ReplyIcon size={20} color={COLORS.white} />
          </RN.TouchableOpacity>
        </RN.View>
        {answer?.comments?.length !== 0 && (
          <RN.View style={styles.comments}>
            <RN.Text children="Comments:" color={COLORS.textGray} />
            <RN.FlatList
              data={answer.comments}
              renderItem={({item}) => renderComments({item})}
              // ListFooterComponent={<Spacing height={20} />}
              ItemSeparatorComponent={renderSeparator}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </RN.View>
        )}
      </RN.View>
    </RN.View>
  );
};

export default observer(Answer);

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: COLORS.dargGray,
    borderRadius: 15,
  },
  topBox: {
    paddingHorizontal: normalizeWidth(10),
    gap: 10,
    // backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingBottom: 15,
  },
  userBox: {
    paddingTop: normalizeHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userAvatar: {
    width: normalizeWidth(45),
    height: normalizeHeight(45),
    borderRadius: 45,
  },
  check: {
    width: normalizeWidth(20),
    height: normalizeHeight(20),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.textGray,
  },
  commentUserAvatar: {
    width: normalizeWidth(30),
    height: normalizeHeight(30),
    borderRadius: 30,
  },
  answer: {
    gap: 10,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: normalizeWidth(10),
    paddingBottom: normalizeHeight(10),
  },
  upDown: {
    alignItems: 'center',
  },
  downButton: {
    transform: [{rotate: '180deg'}],
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    paddingHorizontal: normalizeWidth(10),
    height: normalizeHeight(40),
    width: 'auto',
    backgroundColor: COLORS.lightGray,
    color: COLORS.white,
    gap: 5,
    borderRadius: 30,
  },
  votesCount: {
    textAlign: 'center',
    minWidth: normalizeWidth(30),
  },
  comments: {
    width: '100%',
    backgroundColor: '#11111188',
    paddingHorizontal: normalizeWidth(10),
    paddingVertical: normalizeHeight(10),
    gap: 10,
  },
  commentUser: {
    flexDirection: 'row',
    gap: 8,
  },
  commentUserInfo: {
    gap: 2,
  },
  commentUserName: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
});
