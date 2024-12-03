import {CommentType, Post} from '@types';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {FC, useCallback} from 'react';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import PostFooter from './PostFooter';
import {timeSince} from 'shared/utils/date';
import {Spacing} from 'components/Spacing';
import Avatar from 'components/Avatar/Avatar';
import PostType from 'components/PostType/PostType';
import CheckboxIcon from 'shared/assets/icons/CheckboxIcon';
import {getOptionPercentage} from 'shared/utils/calculations';

interface Props {
  post?: Post;
  postComments?: CommentType[];
  onFollowTopic?: () => void;
  onFollowUser?: () => void;
  onUpVote?: () => void;
  onDownVote?: () => void;
  onEnterPost?: () => void;
  isEnter?: boolean;
  userId?: string;
  onReplyPress?: () => void;
  onVoteOptionPress: (id: string) => void;
}

const Question: FC<Props> = ({
  post,
  postComments,
  onReplyPress,
  onDownVote,
  onEnterPost,
  onFollowTopic,
  onFollowUser,
  onUpVote,
  isEnter,
  userId,
  onVoteOptionPress,
}) => {
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
              <RN.Text size="h6" font="Medium" color={COLORS.white}>
                {item.votedUserIds?.includes(userId as never) &&
                  `${getOptionPercentage(post.pollOptions, item.id)} ${
                    item.votesCount
                  }${item.votesCount === 1 ? ' vote' : ' votes'}`}
              </RN.Text>
            </RN.View>
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
          </RN.TouchableOpacity>
        );
      })
    );
  }, [onVoteOptionPress, post?.pollOptions, post?.type, userId]);

  const renderSeparator = () => <Spacing height={15} />;

  return (
    <RN.View style={styles.container}>
      <RN.Pressable style={styles.top} onPress={onEnterPost}>
        <RN.View fd={'row'} ai={'center'} jc={'space-between'} p={6}>
          {isEnter ? (
            <RN.View fd={'row'} ai={'center'} g={8}>
              <Avatar
                isShowFollowBtn={
                  !post?.user?.followerIds?.includes(userId as never) &&
                  post?.userId !== userId
                }
                size={60}
                uri={post?.user?.userImageUrl}
                onPressFollowBtn={onFollowUser}
              />
              <RN.View>
                <RN.Text
                  children={
                    (post?.user?.firstName?.length as never) > 22
                      ? post?.user?.firstName.slice(0, 19) + '...'
                      : post?.user?.firstName
                  }
                  size="h2"
                  font="Medium"
                />
                <RN.Text
                  children={`${timeSince(post?.createdAt as never)}`}
                  color={COLORS.textGray}
                  size="h6"
                />
              </RN.View>
            </RN.View>
          ) : (
            <RN.View fd={'row'} ai={'center'} g={8}>
              <Avatar
                isShowFollowBtn={
                  !post?.topic?.followerIds?.includes(userId as never)
                }
                size={60}
                uri={post?.topic?.avatar}
                onPressFollowBtn={onFollowTopic}
              />
              <RN.View>
                <RN.Text
                  children={
                    (post?.topic?.title?.length as never) > 22
                      ? post?.topic?.title.slice(0, 19) + '...'
                      : post?.topic?.title
                  }
                  size="h2"
                  font="Medium"
                />
                <RN.Text
                  children={`${post?.topic?.followerIds?.length} Followers`}
                  color={COLORS.textGray}
                  size="h6"
                />
              </RN.View>
            </RN.View>
          )}
          <PostType postType={post?.type as never} />
        </RN.View>
        <RN.View style={styles.question}>
          <RN.Text size="h2" font="Medium">
            {post?.title}
          </RN.Text>
          <Spacing height={4} />
          {post?.body && isEnter && (
            <RN.Text size="h6" font="Medium">
              {post.body}
            </RN.Text>
          )}
          <Spacing height={10} />
          {post?.mediaType === 'image' && post?.media && (
            <RN.Image style={styles.media} source={{uri: post?.media}} />
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
  question: {
    paddingRight: normalizeHeight(15),
    width: '100%',
    paddingHorizontal: normalizeWidth(12),
    paddingBottom: normalizeHeight(12),
  },
  media: {
    width: '100%',
    height: normalizeHeight(200),
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
    paddingVertical: normalizeHeight(12),
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
