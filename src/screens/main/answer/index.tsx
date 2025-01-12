import Container from 'components/Container';
import React, {useCallback, useRef} from 'react';
import {QuestionCard} from 'components/Cards';
import RN from 'components/RN';
import Answer from 'components/Cards/ui/Answer';
import Header from './ui/Header';
import CommentInput from './ui/CommentInput';
import {observer} from 'mobx-react-lite';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {AnswerType, Post} from '@types';
import {Spacing} from 'components/Spacing';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import PreviewUserModal from 'components/PreviewUserBottomSheet/PreviewUserBottomSheet';
import AnimatedAlert from 'components/AnimatedAlert/AnimatedAlert';
import TopicModal from 'components/TopicModal/TopicModal';
import PreviewMediaPost from 'components/PreviewMediaPost/PreviewMediaPost';
import ReportBottomSheet from 'components/ReportBottomSheet/ReportBottomSheet';

const AnswerScreen = () => {
  const {
    state,
    setReplyPost,
    setReplyAnswer,
    onUpVote,
    donwVote,
    onUpVoteAnswer,
    donwVoteAnswer,
    onReplyMessageHandle,
    onVoteToPollOption,
    onSelectTrueAnswer,
  } = useRootStore().post;

  const {user, topic} = useRootStore();
  const {show, hide, visible} = useRootStore().visible;
  const {userId} = useRootStore().local;
  const textInputRef = useRef<TextInput>(null);

  const onHandleReplyAnswerBtn = useCallback(
    (answer: AnswerType) => {
      setReplyAnswer(answer, true);
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    },
    [setReplyAnswer],
  );

  const onHandleReplyPostBtn = useCallback(
    (post: Post) => {
      setReplyPost(post, true);
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    },
    [setReplyPost],
  );

  const renderAnswers = useCallback(
    ({item}: {item: AnswerType}) => (
      <Answer
        key={item._id}
        answer={item}
        postUserId={state.previewPost.userId}
        onUpVote={() => onUpVoteAnswer(item)}
        onDownVote={() => donwVoteAnswer(item)}
        onReplyBtnPress={() => onHandleReplyAnswerBtn(item)}
        onSelectTrueAnswerPress={() => onSelectTrueAnswer(item)}
      />
    ),
    [
      donwVoteAnswer,
      onHandleReplyAnswerBtn,
      onUpVoteAnswer,
      state.previewPost.userId,
      onSelectTrueAnswer,
    ],
  );

  const onReportHandle = useCallback(() => {
    show('reportModal');
  }, [show]);

  const renderCard = useCallback(
    () => (
      <QuestionCard
        post={state.previewPost}
        postComments={state.postComments}
        isEnter={true}
        userId={userId as never}
        onUpVote={() => onUpVote(state.previewPost)}
        onDownVote={() => donwVote(state.previewPost)}
        onReplyPress={() => onHandleReplyPostBtn(state.previewPost as never)}
        onFollowUser={() =>
          user.onFollowToUser(state.previewPost.user, 'postPreview')
        }
        onVoteOptionPress={id => onVoteToPollOption(id)}
        onPressUser={() => show('previewUser')}
        onPressMedia={() => show('previewMedia')}
        onReportPress={onReportHandle}
      />
    ),
    [
      state.previewPost,
      state.postComments,
      userId,
      onReportHandle,
      onUpVote,
      donwVote,
      onHandleReplyPostBtn,
      user,
      onVoteToPollOption,
      show,
    ],
  );

  const renderSeparator = () => <Spacing height={10} />;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSend = () => {
    onReplyMessageHandle();
    dismissKeyboard();
  };

  const onPressOutHandle = () => {
    dismissKeyboard();
    hide('previewUser');
    hide('previewTopic');
  };

  const onHandlePreviewTopic = () => {
    topic.onSetPreviewTopic(state.previewPost.topic);
    hide('previewTopic');
  };
  const onHandlePreviewUser = () => {
    user.setPreviewUser(state.previewPost.userId);
    hide('previewUser');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container
        onPress={onPressOutHandle}
        Header={<Header />}
        Footer={<CommentInput onSend={onSend} inputRef={textInputRef} />}>
        <Spacing height={20} />
        <RN.View flex={1}>
          <RN.FlatList
            keyboardShouldPersistTaps="handled"
            scrollsToTop={true}
            ListHeaderComponent={renderCard()}
            ListHeaderComponentStyle={{marginBottom: 20}}
            data={state.postAnswers}
            renderItem={renderAnswers}
            ListFooterComponent={<Spacing height={60} />}
            ItemSeparatorComponent={renderSeparator}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
          />
        </RN.View>
        <PreviewUserModal
          isVisible={visible.previewUser}
          user={state.previewPost.user}
          onClose={() => hide('previewUser')}
          onPress={onHandlePreviewUser}
        />
        <TopicModal
          isVisible={visible.previewTopic}
          topic={state.previewPost.topic}
          onClose={() => hide('previewTopic')}
          onPress={onHandlePreviewTopic}
        />
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
        <ReportBottomSheet
          isVisible={visible.reportModal}
          onClose={() => hide('reportModal')}
          reports={[]}
          onPressItem={() => {}}
        />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default observer(AnswerScreen);
