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
  View,
} from 'react-native';
import {COLORS} from 'shared/constants/colors';

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

  const {onFollowToUser} = useRootStore().user;
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
        onFollowUser={() => onFollowToUser(state.previewPost.user)}
        onVoteOptionPress={id => onVoteToPollOption(id)}
      />
    ),
    [
      state.previewPost,
      state.postComments,
      userId,
      onUpVote,
      donwVote,
      onHandleReplyPostBtn,
      onFollowToUser,
      onVoteToPollOption,
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

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container
        Header={<Header />}
        Footer={<CommentInput onSend={onSend} inputRef={textInputRef} />}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 12,
            paddingTop: 20,
          }}>
          <RN.FlatList
            keyboardShouldPersistTaps="handled"
            scrollsToTop={true}
            ListHeaderComponent={renderCard()}
            ListHeaderComponentStyle={{marginBottom: 20}}
            data={state.postAnswers}
            renderItem={renderAnswers}
            ListFooterComponent={<Spacing height={120} />}
            ItemSeparatorComponent={renderSeparator}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 120}}
          />
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default observer(AnswerScreen);
