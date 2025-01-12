import React, {FC, useCallback, useRef, useState} from 'react';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {observer} from 'mobx-react-lite';
import PostFooter from 'components/Cards/ui/PostFooter';
import RN from 'components/RN';
import VideoContent from 'components/VideoContent/VideoContent';
import CloseIcon from 'shared/assets/icons/CloseIcon';
import {COLORS} from 'shared/constants/colors';
import {useAppViewInsets} from 'shared/hooks/useAppViewInsets';
import {normalizeHeight, normalizeWidth, SIZES} from 'shared/utils/dimensions';
import {AnswerType, CommentType, Post} from '@types';
import Answer from 'components/Cards/ui/Answer';
import Avatar from 'components/Avatar/Avatar';
import {Spacing} from 'components/Spacing';
import CommentItem from 'components/CommentItem/CommentItem';
import CommentInput from 'screens/main/answer/ui/CommentInput';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import ImageCard from 'components/ImageCard/ImageCard';
import {useTranslation} from 'react-i18next';
import AnimatedAlert from 'components/AnimatedAlert/AnimatedAlert';
import ReportBottomSheet from 'components/ReportBottomSheet/ReportBottomSheet';
import NavigationService from 'shared/navigation/NavigationService';
import {HOME_STACK} from 'shared/navigation/routes';
import UserItem from 'components/UserItem/UserItem';
interface Props {
  post: Post;
  answers: AnswerType[];
  comments: CommentType[];
  onClose: () => void;
}

const PreviewMediaPost: FC<Props> = ({post, onClose, answers, comments}) => {
  const {
    state,
    setReplyPost,
    setReplyAnswer,
    onUpVote,
    donwVote,
    onUpVoteAnswer,
    donwVoteAnswer,
    onReplyMessageHandle,
    onSelectTrueAnswer,
  } = useRootStore().post;
  const {visible, user, topic} = useRootStore();
  const {t} = useTranslation();
  const {paddingTop} = useAppViewInsets();
  const headerHeight = React.useMemo(
    () => normalizeHeight(30) + paddingTop,
    [paddingTop],
  );

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const onHandleReplyPostBtn = useCallback(
    (post: Post) => {
      setReplyPost(post, true);
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    },
    [setReplyPost],
  );

  const onHandleReplyAnswerBtn = useCallback(
    (answer: AnswerType) => {
      setReplyAnswer(answer, true);
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    },
    [setReplyAnswer],
  );

  const renderAnswers = useCallback(
    ({item}: {item: AnswerType}) => (
      <Answer
        key={item._id}
        answer={item}
        postUserId={post.userId}
        onUpVote={() => onUpVoteAnswer(item)}
        onDownVote={() => donwVoteAnswer(item)}
        onReplyBtnPress={() => onHandleReplyAnswerBtn(item)}
        onSelectTrueAnswerPress={() => onSelectTrueAnswer(item)}
      />
    ),
    [
      post.userId,
      donwVoteAnswer,
      onHandleReplyAnswerBtn,
      onUpVoteAnswer,
      onSelectTrueAnswer,
    ],
  );

  const renderComments = useCallback(({item}: {item: CommentType}) => {
    return <CommentItem comment={item} />;
  }, []);

  const renderSeparator = () => <Spacing height={15} />;

  const commentsFlat = useCallback(() => {
    return (
      comments &&
      comments?.length !== 0 && (
        <RN.View style={styles.comments}>
          <RN.Text color={COLORS.textGray} style={styles.textGray}>
            {t('comments')}:
          </RN.Text>
          <RN.FlatList
            data={comments}
            renderItem={({item}) => renderComments({item})}
            ListFooterComponent={<Spacing height={10} />}
            ItemSeparatorComponent={renderSeparator}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </RN.View>
      )
    );
  }, [comments, renderComments, t]);

  const onSend = () => {
    onReplyMessageHandle();
    dismissKeyboard();
  };

  const textInputRef = useRef<TextInput>(null);

  const onHandlePreviewTopic = () => {
    topic.onSetPreviewTopic(state.previewPost.topic);
  };
  const onHandlePreviewUser = () => {
    user.setPreviewUser(state.previewPost.userId);
  };

  return (
    <RN.Modal
      visible={visible.visible.previewMedia}
      style={styles.modal}
      animationType="fade">
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <RN.Pressable
          style={[styles.header, {paddingTop: headerHeight}]}
          onPress={dismissKeyboard}>
          <RN.TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <CloseIcon size={28} color={COLORS.white} />
          </RN.TouchableOpacity>
          <RN.TouchableOpacity
            style={styles.topicInfo}
            onPress={onHandlePreviewTopic}>
            <RN.Text size="h1" color={COLORS.white}>
              {post?.topic?.title}
            </RN.Text>
            <RN.Text
              children={`${post.topic?.followerIds?.length}  ${t(
                'followers',
              )} ${post.topic?.postIds?.length} ${t('posts')}`}
              color={COLORS.textGray}
              size="h6"
            />
          </RN.TouchableOpacity>
          <Avatar uri={post?.topic?.avatar} size={50} isUser={false} />
        </RN.Pressable>
        <GestureHandlerRootView
          style={styles.gestureContainer}
          onTouchMove={(i: any) => handleSheetChanges(i.target)}>
          <RN.View style={styles.content}>
            <RN.Pressable style={styles.mediaBox} onPress={dismissKeyboard}>
              {post?.mediaType === 'image' && (
                <ImageCard
                  uri={post?.media}
                  borderR={0.1}
                  height={500}
                  isPreview={true}
                  isZoom={true}
                />
              )}
              {post?.mediaType === 'video' && (
                <VideoContent
                  uri={post?.media}
                  height={SIZES.height / 1.3}
                  borderRadius={0.1}
                />
              )}
            </RN.Pressable>
          </RN.View>
          <BottomSheetModalProvider>
            <BottomSheet
              ref={bottomSheetModalRef}
              snapPoints={['21%', '60%']}
              onChange={handleSheetChanges}
              enableContentPanningGesture
              enablePanDownToClose={false}
              handleIndicatorStyle={{
                backgroundColor: COLORS.white,
              }}
              backgroundStyle={styles.bottomSheet}>
              <RN.Pressable style={{height: '100%'}} onPress={dismissKeyboard}>
                <BottomSheetView>
                  <RN.View
                    g={5}
                    style={styles.postHeader}
                    bgColor={COLORS.ebon}>
                    <UserItem
                      user={post.user}
                      onPress={onHandlePreviewUser}
                      btnLoading={
                        user.state.followUserLoading[post?.user?.uid as never]
                      }
                    />
                    <RN.Text color={COLORS.white}>{post?.title}</RN.Text>
                  </RN.View>
                  <RN.View
                    style={{paddingBottom: normalizeHeight(10)}}
                    bgColor={COLORS.ebon}>
                    <PostFooter
                      post={post}
                      backColor={COLORS.ebon}
                      onUpVote={() => onUpVote(post)}
                      onDownVote={() => donwVote(post)}
                      onReplyPress={() => onHandleReplyPostBtn(post as never)}
                    />
                  </RN.View>
                  {commentsFlat()}
                  {post?.type === 'Question' && (
                    <RN.View style={styles.answers}>
                      <RN.FlatList
                        keyboardShouldPersistTaps="handled"
                        ListHeaderComponentStyle={{marginBottom: 20}}
                        data={answers}
                        renderItem={renderAnswers}
                        ListFooterComponent={<Spacing height={50} />}
                        ItemSeparatorComponent={renderSeparator}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                      />
                    </RN.View>
                  )}
                </BottomSheetView>
                <RN.View style={[styles.footer, {}]}>
                  <CommentInput onSend={onSend} inputRef={textInputRef} />
                </RN.View>
              </RN.Pressable>
            </BottomSheet>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </KeyboardAvoidingView>
      <AnimatedAlert
        isShow={visible.visible.alert}
        message={`You are level ${user.state.userState.level.level}. You have used ${user.state.userState.usedVotes} of ${user.state.userState.level.upOrDownVote} votes in one month`}
        onClose={() => visible.hide('alert')}
      />
      <ReportBottomSheet
        isVisible={visible.visible.reportModal}
        onClose={() => visible.hide('reportModal')}
        reports={[]}
        onPressItem={() => {}}
      />
    </RN.Modal>
  );
};

export default observer(PreviewMediaPost);

const styles = RN.StyleSheet.create({
  modal: {
    backgroundColor: COLORS.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeWidth(20),
    backgroundColor: COLORS.black,
  },
  topicInfo: {
    alignItems: 'center',
  },
  closeIcon: {
    width: 50,
  },
  content: {
    flex: 0.8,
    justifyContent: 'center',
    paddingVertical: normalizeHeight(15),
  },
  mediaBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    width: '100%',
    minHeight: normalizeHeight(500),
    maxHeight: '100%',
  },
  postUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  loadingIndicator: {
    position: 'absolute',
    zIndex: 2,
  },
  gestureContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  bottomModal: {
    width: '100%',
    backgroundColor: COLORS.dargGray,
  },
  bottomSheet: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.ebon,
  },
  postHeader: {
    paddingHorizontal: normalizeWidth(15),
  },
  answers: {
    paddingHorizontal: normalizeWidth(10),
    maxHeight: '60%',
  },
  comments: {
    width: '100%',
    maxHeight: '60%',
    backgroundColor: COLORS.dargGray,
    paddingHorizontal: normalizeWidth(15),
    paddingVertical: normalizeHeight(10),
    gap: 10,
  },
  textGray: {
    marginBottom: normalizeHeight(6),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  },
});
