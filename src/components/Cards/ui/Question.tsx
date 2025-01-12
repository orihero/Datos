import {CommentType, Post} from '@types';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {FC, useCallback} from 'react';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import PostFooter from './PostFooter';
import {timeSince} from 'shared/utils/date';
import {Spacing} from 'components/Spacing';
import CheckboxIcon from 'shared/assets/icons/CheckboxIcon';
import {getOptionPercentage} from 'shared/utils/calculations';
import VideoContent from 'components/VideoContent/VideoContent';
import ImageCard from 'components/ImageCard/ImageCard';
import {useTranslation} from 'react-i18next';
import UserItem from 'components/UserItem/UserItem';
import TopicItem from 'components/TopicItem/TopicItem';
import {useRootStore} from 'shared/store/hooks/useRootStore';

interface Props {
  post?: Post;
  postComments?: CommentType[];
  onFollowTopic?: () => void;
  onFollowUser?: () => void;
  onPressUser?: () => void;
  onPressTopic?: () => void;
  onUpVote?: () => void;
  onDownVote?: () => void;
  onEnterPost?: () => void;
  isEnter?: boolean;
  userId?: string;
  onReplyPress?: () => void;
  onReportPress?: () => void;
  onVoteOptionPress: (id: string) => void;
  onPressMedia?: () => void;
  isZoom?: boolean;
}

const Question: FC<Props> = ({
  post,
  postComments,
  onReplyPress,
  onReportPress,
  onDownVote,
  onEnterPost,
  onFollowTopic,
  onFollowUser,
  onPressTopic,
  onUpVote,
  isEnter,
  userId,
  onVoteOptionPress,
  onPressUser,
  onPressMedia,
  isZoom,
}) => {
  const {t} = useTranslation();
  const {topic, user} = useRootStore();

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
              {item?.user?.firstName} {item?.user?.lastName}
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

  const commentsFlat = useCallback(() => {
    return (
      isEnter &&
      postComments &&
      postComments?.length !== 0 && (
        <RN.View style={styles.comments}>
          <RN.Text children="Comments:" color={COLORS.textGray} />
          <RN.FlatList
            data={postComments}
            renderItem={({item}) => renderComments({item})}
            // ListFooterComponent={<Spacing height={20} />}
            ItemSeparatorComponent={renderSeparator}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </RN.View>
      )
    );
  }, [isEnter, postComments, renderComments]);

  const renderPollOptions = useCallback(() => {
    return (
      post?.type === 'Poll' &&
      post?.pollOptions.map(item => {
        return (
          <RN.TouchableOpacity
            style={styles.pollItem}
            key={item.id}
            onPress={() => onVoteOptionPress(item.id)}>
            <RN.View style={styles.optionInfo}>
              <RN.View style={styles.optionTitle}>
                <RN.Text size="h4" font="Medium" color={COLORS.white}>
                  {item.text}
                </RN.Text>
                {item.votedUserIds?.includes(userId as never) && (
                  <CheckboxIcon size={20} color={COLORS.white} />
                )}
              </RN.View>
              <RN.View>
                <RN.Text size="h6" font="Medium" color={COLORS.white}>
                  {post.pollVotedUserIds?.includes(userId as never) &&
                    `${getOptionPercentage(post.pollOptions, item.id)}`}
                </RN.Text>
                <RN.Text size="h6" font="Medium" color={COLORS.white}>
                  {post.pollVotedUserIds?.includes(userId as never) &&
                    `${item.votesCount}${
                      item.votesCount < 2 ? ' vote' : ' votes'
                    }`}
                </RN.Text>
              </RN.View>
            </RN.View>
            {post.pollVotedUserIds?.includes(userId as never) && (
              <RN.View
                style={[
                  styles.selectedOption,
                  {
                    width: `${
                      getOptionPercentage(post.pollOptions, item.id) as never
                    }`,
                  },
                ]}
              />
            )}
          </RN.TouchableOpacity>
        );
      })
    );
  }, [
    onVoteOptionPress,
    post?.pollOptions,
    post?.pollVotedUserIds,
    post?.type,
    userId,
  ]);

  const renderSeparator = () => <Spacing height={15} />;

  return (
    <RN.View style={styles.container}>
      <RN.Pressable style={styles.top} onPress={onEnterPost}>
        <RN.View fd={'row'} ai={'center'} jc={'space-between'} p={6}>
          {isEnter ? (
            <UserItem
              user={post?.user as never}
              titleColor={COLORS.black}
              onPress={onPressUser}
              onFollowPress={onFollowUser}
              btnLoading={
                user.state.followUserLoading[post?.user?.uid as never]
              }
            />
          ) : (
            <TopicItem
              topic={post?.topic as never}
              titleColor={COLORS.black}
              onPress={onPressTopic}
              onFollow={onFollowTopic}
              loading={topic.state.joinTopicLoading[post?.topic?._id as never]}
            />
          )}
        </RN.View>
        <RN.View style={styles.question}>
          <RN.View g={5}>
            <RN.Text color={COLORS.blue} font="Medium">
              {post?.type === 'Post' && `#${t('post')}`}
              {post?.type === 'Question' && `#${t('question')}`}
              {post?.type === 'Poll' && `#${t('poll')}`}
            </RN.Text>
            <RN.Text size="h2" font="Medium">
              {post?.title}
            </RN.Text>
          </RN.View>
          <Spacing height={4} />
          {post?.body && isEnter && (
            <RN.Text size="h6" font="Medium">
              {post.body}
            </RN.Text>
          )}
          <Spacing steps={1} />
          {post?.mediaType === 'image' && post?.media && (
            <RN.Pressable onPress={onPressMedia}>
              <ImageCard
                height={200}
                uri={post?.media}
                onPress={onPressMedia}
                isZoom={isZoom}
              />
            </RN.Pressable>
          )}
          {post?.mediaType === 'video' && post?.media && (
            <RN.Pressable onPress={onPressMedia}>
              <VideoContent
                uri={post?.media}
                height={250}
                onPressEnter={onPressMedia}
              />
            </RN.Pressable>
          )}
          <Spacing height={10} />
          {post?.type === 'Poll' && (
            <RN.View style={styles.pollItemBox}>{renderPollOptions()}</RN.View>
          )}
        </RN.View>
      </RN.Pressable>
      {
        <PostFooter
          post={post}
          onEnterPostByAnswer={onEnterPost}
          onEnterPostByView={onEnterPost}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onEnterPost={onEnterPost}
          userId={userId}
          onReplyPress={onReplyPress}
          onReportPress={onReportPress}
          isEnter={isEnter}
        />
      }
      {commentsFlat()}
    </RN.View>
  );
};

export default observer(Question);

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: COLORS.dargGray,
    borderRadius: 15,
  },
  top: {
    borderRadius: 15,
    backgroundColor: COLORS.white,
    width: '100%',
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topicImage: {
    width: normalizeWidth(50),
    height: normalizeHeight(50),
    resizeMode: 'cover',
    borderRadius: 50,
  },
  followButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalizeWidth(15),
    paddingVertical: normalizeHeight(10),
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 15,
  },
  reportBtn: {
    transform: [{rotate: `${90}deg`}],
    marginRight: 10,
  },
  question: {
    paddingRight: normalizeHeight(15),
    width: '100%',
    paddingHorizontal: normalizeWidth(12),
    paddingBottom: normalizeHeight(12),
  },
  media: {
    width: '100%',
    height: normalizeHeight(250),
    borderRadius: 20,
  },
  pollItemBox: {
    gap: 5,
  },
  pollItem: {
    backgroundColor: COLORS.dargGray,
    borderRadius: 10,
  },
  optionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optionInfo: {
    paddingHorizontal: normalizeWidth(10),
    paddingVertical: normalizeHeight(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 5,
  },
  selectedOption: {
    borderRadius: 10,
    backgroundColor: COLORS.blue,
    position: 'absolute',
    height: '100%',
    zIndex: -1,
  },
  comments: {
    width: '100%',
    backgroundColor: '#11111188',
    paddingHorizontal: normalizeWidth(10),
    paddingVertical: normalizeHeight(10),
    gap: 10,
  },
  commentUserAvatar: {
    width: normalizeWidth(30),
    height: normalizeHeight(30),
    borderRadius: 30,
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
