import React, {FC, useCallback, useState} from 'react';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import {AnswerType, Post} from '@types';
import {QuestionCard} from 'components/Cards';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import Tabbar from 'components/Tabbar/Tabbar';
import Answer from 'components/Cards/ui/Answer';

interface Props {
  posts: Post[];
  answers: AnswerType[];
}

const Display: FC<Props> = ({posts, answers}) => {
  const {user, local, topic, post, visible} = useRootStore();
  const [tab, setTab] = useState('Posts');

  const tabChangeToPosts = () => {
    setTab('Posts');
  };
  const tabChangeToAnswers = () => {
    setTab('Answers');
  };

  const onPressMedia = useCallback(
    (id: string, type: string) => {
      post.getPostById(id, type);
      visible.show('previewMedia');
    },
    [post, visible],
  );

  const renderSeparator = () => <Spacing height={15} />;

  const renderTopicPost = useCallback(
    ({item}: {item: Post}) => {
      return (
        <QuestionCard
          post={item}
          onEnterPost={() => post.getPostById(item._id, item.type, true)}
          onUpVote={() => post.onUpVote(item)}
          onDownVote={() => post.donwVote(item)}
          userId={local.userId as never}
          onFollowTopic={() =>
            topic.onFollowToTopic(item.topic, 'previewUserPosts')
          }
          onVoteOptionPress={id => post.onVoteToPollOptionAtHome(item, id)}
          onPressMedia={() => onPressMedia(item._id, item.type)}
        />
      );
    },
    [local.userId, onPressMedia, post, topic],
  );

  const renderAnswers = useCallback(
    ({item}: {item: AnswerType}) => (
      <Answer
        key={item._id}
        answer={item}
        postUserId={post.state.previewPost.userId}
        onUpVote={() => post.onUpVoteAnswer(item)}
        onDownVote={() => post.donwVoteAnswer(item)}
        onReplyBtnPress={() => {}}
        onSelectTrueAnswerPress={() => post.onSelectTrueAnswer(item)}
      />
    ),
    [post],
  );

  const renderFlatlist = useCallback(() => {
    if (tab === 'Posts') {
      return (
        <RN.FlatList
          renderItem={renderTopicPost}
          data={posts}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator}
          ListFooterComponent={<Spacing height={350} />}
        />
      );
    } else if (tab === 'Answers') {
      return (
        <RN.FlatList
          renderItem={renderAnswers}
          data={answers}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator}
          ListFooterComponent={<Spacing height={350} />}
        />
      );
    }
  }, [answers, posts, renderAnswers, renderTopicPost, tab]);

  return (
    <RN.View style={styles.container}>
      <Tabbar
        activeTab={tab}
        onChangePosts={tabChangeToPosts}
        onChangeAnswers={tabChangeToAnswers}
        postsLength={user.state?.previewUserPosts?.length}
      />
      <RN.View style={styles.listContainer}>{renderFlatlist()}</RN.View>
    </RN.View>
  );
};

export default observer(Display);

const styles = RN.StyleSheet.create({
  container: {},
  listContainer: {},
});
