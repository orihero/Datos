import React, {FC, useCallback} from 'react';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import {COLORS} from 'shared/constants/colors';
import {Post, Topic} from '@types';
import {QuestionCard} from 'components/Cards';
import TopicItem from 'components/TopicItem/TopicItem';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import AnimatedAlert from 'components/AnimatedAlert/AnimatedAlert';
import PreviewMediaPost from 'components/PreviewMediaPost/PreviewMediaPost';

interface Props {
  topic: Topic;
  posts: Post[];
}

const Display: FC<Props> = ({topic, posts}) => {
  const {getPostById, onUpVote, donwVote, onVoteToPollOptionAtHome} =
    useRootStore().post;
  const {userId} = useRootStore().local;
  const {onFollowToTopic, state} = useRootStore().topic;
  const {visible, hide, show} = useRootStore().visible;
  const {user, post} = useRootStore();

  const onPressMedia = useCallback(
    (id: string, type: string) => {
      getPostById(id, type);
      show('previewMedia');
    },
    [getPostById, show],
  );

  const renderTopicPost = useCallback(
    ({item}: {item: Post}) => {
      return (
        <QuestionCard
          isEnter
          post={item}
          onPressUser={() => getPostById(item._id, item.type, true)}
          onEnterPost={() => getPostById(item._id, item.type, true)}
          onUpVote={() => onUpVote(item)}
          onDownVote={() => donwVote(item)}
          userId={userId as never}
          onFollowUser={() =>
            user.onFollowToUser(item.user, 'previewTopicPosts')
          }
          onVoteOptionPress={id => onVoteToPollOptionAtHome(item, id)}
          onPressMedia={() => onPressMedia(item._id, item.type)}
        />
      );
    },
    [
      donwVote,
      getPostById,
      onPressMedia,
      onUpVote,
      onVoteToPollOptionAtHome,
      user,
      userId,
    ],
  );

  const renderSeparator = () => <Spacing height={15} />;

  const renderFlatlist = useCallback(() => {
    return (
      <RN.FlatList
        renderItem={renderTopicPost}
        data={posts}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={<Spacing height={350} />}
      />
    );
  }, [posts, renderTopicPost]);

  return (
    <RN.View style={styles.container}>
      <RN.View pb={5}>
        <TopicItem
          topic={topic}
          onFollow={() => onFollowToTopic(topic, 'previewTopic')}
          loading={state.joinTopicLoading[topic?._id as never]}
          isFollowBtnShow={true}
        />
      </RN.View>
      <RN.Text color={COLORS.textGray}>{topic?.description}</RN.Text>
      <Spacing height={10} />
      <RN.View style={styles.listContainer}>{renderFlatlist()}</RN.View>
      <AnimatedAlert
        isShow={visible.alert}
        message={`You are level ${user.state.userState.level.level}. You have used ${user.state.userState.usedVotes} of ${user.state.userState.level.upOrDownVote} votes in one month`}
        onClose={() => hide('alert')}
      />
      <PreviewMediaPost
        onClose={() => hide('previewMedia')}
        post={post.state.previewPost}
        answers={post.state.postAnswers ? post.state.postAnswers : []}
        comments={post.state.postComments ? post.state.postComments : []}
      />
    </RN.View>
  );
};

export default observer(Display);

const styles = RN.StyleSheet.create({
  container: {
    gap: 10,
  },
  listContainer: {},
});
