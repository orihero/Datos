import Container from 'components/Container';
import React, {useCallback, useEffect} from 'react';
import {HomeHeader} from './ui';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import Question from 'components/Cards/ui/Question';
import {Post, Topic} from '@types';
import {Spacing} from 'components/Spacing';
import AnimatedAlert from 'components/AnimatedAlert/AnimatedAlert';
import PreviewMediaPost from 'components/PreviewMediaPost/PreviewMediaPost';
import ReportBottomSheet from 'components/ReportBottomSheet/ReportBottomSheet';
import {ReportsData} from 'shared/constants/reports';
import {Keyboard} from 'react-native';
import TopicModal from 'components/TopicModal/TopicModal';
import ListEmptyComponent from 'components/ListEmptyComponent/ListEmptyComponent';

const HomeScreen = () => {
  const {
    state,
    getPostById,
    onUpVote,
    donwVote,
    onVoteToPollOptionAtHome,
    setReportMessage,
    fetchJoinedPost,
  } = useRootStore().post;
  const {userId} = useRootStore().local;
  const {onFollowToTopic, onSetPreviewTopic} = useRootStore().topic;
  const {visible, hide, show} = useRootStore().visible;
  const {user} = useRootStore();

  const onPressMedia = useCallback(
    (id: string, type: string) => {
      getPostById(id, type);
      show('previewMedia');
    },
    [getPostById, show],
  );

  const onReportHandle = useCallback(
    (id: string) => {
      show('reportModal');
      setReportMessage('postId', id);
    },
    [setReportMessage, show],
  );

  const SetTopic = useCallback(
    (topic: Topic) => {
      onSetPreviewTopic(topic);
    },
    [onSetPreviewTopic],
  );

  const renderPosts = useCallback(
    ({item}: {item: Post}) => {
      return (
        <Question
          post={item}
          key={item._id}
          onEnterPost={() => getPostById(item._id, item.type, true)}
          onUpVote={() => onUpVote(item)}
          onDownVote={() => donwVote(item)}
          userId={userId as never}
          onFollowTopic={() => onFollowToTopic(item.topic, 'allPosts')}
          onVoteOptionPress={id => onVoteToPollOptionAtHome(item, id)}
          onPressMedia={() => onPressMedia(item._id, item.type)}
          onReportPress={() => onReportHandle(item._id)}
          onFollowUser={() => user.onFollowToUser(item.user, 'allPosts')}
          onPressTopic={() => SetTopic(item.topic)}
        />
      );
    },
    [
      userId,
      SetTopic,
      getPostById,
      onUpVote,
      donwVote,
      onFollowToTopic,
      onVoteToPollOptionAtHome,
      onPressMedia,
      onReportHandle,
      user,
    ],
  );

  const renderSeparator = () => <Spacing height={10} />;

  const onHandlePreviewTopic = () => {
    onSetPreviewTopic(state.previewPost.topic);
    hide('previewTopic');
  };

  return (
    <Container Header={<HomeHeader />} onPress={Keyboard.dismiss}>
      <RN.View ph={12} flex={1} g={10}>
        <RN.FlatList
          data={state.joinedPosts}
          renderItem={({item}) => renderPosts({item})}
          ListFooterComponent={<Spacing height={120} />}
          ListHeaderComponent={<Spacing height={20} />}
          ItemSeparatorComponent={renderSeparator}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onRefresh={() => fetchJoinedPost(userId as never)} // Yangilash funksiyasini beramiz
          refreshing={state.isLoadingHome} // Yangi ma'lumot yuklanayotganini bildiruvchi flag
          ListEmptyComponent={
            <ListEmptyComponent title="Siz a'zo bo'lgan topiclar postlari mavjud emas" />
          }
        />
      </RN.View>
      <AnimatedAlert
        isShow={visible.alert}
        message={`You are level ${user.state.userState.level.level}. You have used ${user.state.userState.usedVotes} of ${user.state.userState.level.upOrDownVote} votes in one month`}
        onClose={() => hide('alert')}
      />
      <PreviewMediaPost
        onClose={() => hide('previewMedia')}
        post={state.previewPost}
        answers={state.postAnswers ? state.postAnswers : []}
        comments={state.postComments ? state.postComments : []}
      />
      <TopicModal
        isVisible={visible.previewTopic}
        topic={state.previewPost.topic}
        onClose={() => hide('previewTopic')}
        onPress={onHandlePreviewTopic}
      />
      <ReportBottomSheet
        isVisible={visible.reportModal}
        onClose={() => hide('reportModal')}
        reports={ReportsData as never}
      />
    </Container>
  );
};

export default observer(HomeScreen);
