import {makeAutoObservable, runInAction} from 'mobx';
import RootStore from './RootStore';
import {
  AnswerInitial,
  AnswerType,
  CommentInitial,
  CommentType,
  Post,
  PostInitial,
  Topic,
} from '@types';
import PostsApi from 'shared/api/post.api';
import Loading from 'shared/utils/Loading';
import NavigationService from 'shared/navigation/NavigationService';
import {HOME_STACK, ROOT_STACK} from 'shared/navigation/routes';
import type {Asset} from 'react-native-image-picker';
import StorageApi from 'shared/api/storage.api';
import {nanoid} from 'nanoid/non-secure';
import UsersApi from 'shared/api/users.api';

export interface PostStoreState {
  newPostState: Post;
  newPostMediaUrl: Asset;
  newAnswerState: AnswerType;
  newCommentToAnswerState: CommentType;
  postAnswers: AnswerType[];
  postComments: CommentType[];
  postId: string;
  allPosts: Post[];
  previewPost: Post;
  postType: string;
  replyComment: CommentType;
  isReply: boolean;
}

const initialState: PostStoreState = {
  newPostState: PostInitial,
  newPostMediaUrl: {},
  newAnswerState: AnswerInitial,
  newCommentToAnswerState: CommentInitial,
  postAnswers: [],
  postComments: [],
  postId: '',
  allPosts: [],
  previewPost: {} as never,
  postType: '',
  replyComment: CommentInitial as never,
  isReply: false,
};

export default class PostStore {
  state: PostStoreState = initialState;
  loadingWhenCreatePost: Loading = new Loading();

  private readonly rootStore: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.rootStore = root;
    this.fetchAllPost();
  }

  //post

  fetchAllPost = async () => {
    try {
      PostsApi.getAllPosts(snapshot => {
        runInAction(() => {
          this.state.allPosts = snapshot as never;
        });
      });
    } catch (err) {
      console.log(['Error: fetchAllTopics', err]);
    }
  };

  onChangeOfNewPostState = <T extends keyof PostStoreState['newPostState']>(
    key: T,
    value: PostStoreState['newPostState'][T],
  ) => {
    this.state = {
      ...this.state,
      newPostState: {
        ...this.state.newPostState,
        [key]: value,
      },
    };
  };

  onSelectNewPostMediaUrl = (file: Asset) => {
    runInAction(() => {
      this.state.newPostMediaUrl = file;
    });
  };

  onRemoveNewPostMediaUrl = () => {
    runInAction(() => {
      this.state.newPostMediaUrl = {};
    });
  };

  onCreatePost = async () => {
    try {
      this.loadingWhenCreatePost.show();
      this.state.newPostState = {
        ...this.state.newPostState,
        _id: nanoid(10),
        topicId: this.state.newPostState?.topic._id,
        topic: {} as never,
        userId: this.rootStore.local.userId as never,
      };

      if (this.state.newPostMediaUrl.uri) {
        const uploadedMedia = await StorageApi.uploadImage({
          file: this.state.newPostMediaUrl,
        });
        runInAction(() => {
          this.state.newPostState.media = uploadedMedia as never;
          this.state.newPostState.mediaType =
            this.state.newPostMediaUrl.type?.split('/')[0] as never;
        });
      }
      if (this.state.newPostState.type !== 'Poll') {
        this.state.newPostState.pollEndDays = null as never;
        this.state.newPostState.pollOptions = null as never;
      }
      await PostsApi.addPost(this.state.newPostState);

      setTimeout(() => {
        this.loadingWhenCreatePost.hide();
        NavigationService.navigate(ROOT_STACK.HOME);
      }, 200);
      this.onClearPostData();
    } catch (error) {
      console.log(['Error: onCreatePost'], error);
      this.loadingWhenCreatePost.hide();
    } finally {
      setTimeout(() => {
        this.loadingWhenCreatePost.hide();
      }, 200);
    }
  };

  onSelectTopic = (topic: Topic) => {
    runInAction(() => {
      this.state.newPostState.topic = topic;
    });
  };

  onRemoveTopic = () => {
    runInAction(() => {
      this.state.newPostState.topic = {} as never;
    });
  };

  onClearPostData = () => {
    runInAction(() => {
      this.state.newPostState = PostInitial;
      this.state.newPostMediaUrl = {};
    });
  };

  getPostById = async (postId: string, postType: string) => {
    runInAction(() => {
      this.state.postId = postId;
      this.state.postType = postType;
    });
    try {
      const onePost: Post = this.state.allPosts.find(
        item => item._id === postId,
      ) as never;
      const userId = this.rootStore.local?.userId as never;

      runInAction(() => {
        this.state.previewPost = onePost as never;
      });

      setTimeout(() => {
        NavigationService.navigate(HOME_STACK.ANSWER);
      }, 200);
      this.fetchAnswersOfPost(this.state.previewPost._id);
      this.fetchCommentsOfPost(this.state.previewPost._id);
      if (onePost.viewUserIds?.includes(userId)) {
        return;
      } else {
        const newUserIds = [...onePost.viewUserIds, userId];
        this.state.previewPost.viewUserIds = newUserIds;
        await PostsApi.updateViewPost(onePost.docId, {
          ...onePost,
          viewUserIds: newUserIds,
          user: {} as never,
          topic: {} as never,
          comments: [] as never,
        });
      }
    } catch (error) {
      console.log(['Errro: getPostById'], error);
    }
  };

  getUpdateChanges = async (postId: string) => {
    runInAction(() => {
      this.state.postId = postId;
    });
    try {
      setTimeout(() => {
        const onePost: Post = this.state.allPosts.find(
          item => item._id === postId,
        ) as never;

        runInAction(() => {
          this.state.previewPost = onePost as never;
        });
      }, 500);
    } catch (error) {
      console.log(['Errro: getPostById'], error);
    }
  };

  onUpVote = async (post: Post) => {
    let postData = post;
    try {
      if (
        !postData.upVoteUserIds?.includes(this.rootStore.local.userId as never)
      ) {
        postData.upVoteUserIds = [
          ...postData.upVoteUserIds,
          this.rootStore.local.userId,
        ] as never;
        if (
          postData.downVoteUserIds?.includes(
            this.rootStore.local.userId as never,
          )
        ) {
          postData.downVoteUserIds = postData.downVoteUserIds.filter(
            item => item !== this.rootStore.local.userId,
          );
        }

        postData.votesCount =
          postData.upVoteUserIds.length - postData.downVoteUserIds.length;

        await PostsApi.updateViewPost(postData.docId, {
          ...postData,
          user: {} as never,
          topic: {} as never,
          comments: [] as never,
        });
        this.getUpdateChanges(postData._id);
      } else {
        postData.upVoteUserIds = postData.upVoteUserIds.filter(
          item => item !== this.rootStore.local.userId,
        );
        postData.votesCount =
          postData.upVoteUserIds.length - postData.downVoteUserIds.length;

        await PostsApi.updateViewPost(postData.docId, {
          ...postData,
          user: {} as never,
          topic: {} as never,
          comments: [] as never,
        });
        this.getUpdateChanges(postData._id);
      }
    } catch (error) {
      console.log(['Error: onUpVote', error]);
    }
  };

  donwVote = async (post: Post) => {
    let postData = post;
    try {
      if (
        !postData.downVoteUserIds?.includes(
          this.rootStore.local.userId as never,
        )
      ) {
        postData.downVoteUserIds = [
          ...postData.downVoteUserIds,
          this.rootStore.local.userId,
        ] as never;
        if (
          postData.upVoteUserIds?.includes(this.rootStore.local.userId as never)
        ) {
          postData.upVoteUserIds = postData.upVoteUserIds.filter(
            item => item !== this.rootStore.local.userId,
          );
        }

        postData.votesCount =
          postData.upVoteUserIds.length - postData.downVoteUserIds.length;

        await PostsApi.updateViewPost(post.docId, {
          ...postData,
          user: {} as never,
          topic: {} as never,
          comments: [] as never,
        });
        this.getUpdateChanges(postData._id);
      } else {
        postData.downVoteUserIds = postData.downVoteUserIds.filter(
          item => item !== this.rootStore.local.userId,
        );
        postData.votesCount =
          postData.upVoteUserIds.length - postData.downVoteUserIds.length;

        await PostsApi.updateViewPost(postData.docId, postData);
        this.getUpdateChanges(postData._id);
      }
    } catch (error) {
      console.log(['Error: downVote'], error);
    }
  };

  //answer

  onChangeOfNewAnswerState = <T extends keyof PostStoreState['newAnswerState']>(
    key: T,
    value: PostStoreState['newAnswerState'][T],
  ) => {
    this.state = {
      ...this.state,
      newAnswerState: {
        ...this.state.newAnswerState,
        [key]: value,
      },
    };
  };

  onCreateNewAnswer = async () => {
    try {
      const user = await UsersApi.getUser(
        this.state.previewPost.userId as never,
      );
      if (!user || !user._id) {
        throw new Error('User not found');
      }

      runInAction(() => {
        this.state.newAnswerState = {
          ...this.state.newAnswerState,
          _id: nanoid(10),
          postId: this.state.previewPost._id,
          type: 'answer',
          isCorrect: false,
          userId: this.state.previewPost.userId,
          user: user as never,
        };
        if (!this.state.postAnswers) {
          this.state.postAnswers = [];
        }
        this.state.postAnswers.unshift({
          ...this.state.newAnswerState,
        }) as never;

        this.state.previewPost = {
          ...this.state.previewPost,
          answersCount: this.state.previewPost.answersCount + 1,
        };
      });

      await PostsApi.addAnswer({
        ...this.state.newAnswerState,
        user: {} as never,
      });

      await PostsApi.updateViewPost(this.state.previewPost.docId, {
        ...this.state.previewPost,
        user: {} as never,
        topic: {} as never,
        comments: [],
      });

      this.onClearAnswerState();
      this.clearReplyCommentState();
    } catch (error) {
      console.error('Error in onCreateNewAnswer:', error);
    }
  };

  onCreateNewCommentToAnswer = async () => {
    try {
      this.state.replyComment = {
        ...this.state.replyComment,
        title: this.state.newAnswerState.title,
      };

      await PostsApi.addCommnetToAnswer({
        ...this.state.replyComment,
        user: {} as never,
      });

      runInAction(() => {
        if (!this.state.postAnswers) {
          this.state.postAnswers = [];
        }
        this.state.postAnswers = this.state.postAnswers?.map(item => {
          return item?._id === this.state.replyComment?.answerId
            ? {
                ...item,
                comments: [this.state.replyComment, ...item.comments],
              }
            : {
                ...item,
                comments: item.comments,
              };
        }) as never;
      });

      this.onClearAnswerState();
      this.clearReplyCommentState();
    } catch (error) {
      console.log(['Error: onCreateNewCommentToAnswer'], error);
    }
  };

  fetchAnswersOfPost = (postId: string) => {
    try {
      PostsApi.getPostAnswers(postId, snapshot => {
        runInAction(() => {
          this.state.postAnswers = snapshot as never;
        });
      });
    } catch (error) {
      console.log(['Error: fetchAnswersOfPost'], error);
    }
  };

  onClearAnswerState = () => {
    runInAction(() => {
      this.state.newAnswerState = AnswerInitial;
      this.state.replyComment = CommentInitial;
      this.state.isReply = false;
    });
  };

  onUpVoteAnswer = async (answer: AnswerType) => {
    let answerData = answer;
    try {
      if (
        !answerData.upVoteUserIds?.includes(
          this.rootStore.local.userId as never,
        )
      ) {
        answerData.upVoteUserIds = [
          ...answerData.upVoteUserIds,
          this.rootStore.local.userId,
        ] as never;
        if (
          answerData.downVoteUserIds?.includes(
            this.rootStore.local.userId as never,
          )
        ) {
          answerData.downVoteUserIds = answerData.downVoteUserIds.filter(
            item => item !== this.rootStore.local.userId,
          );
        }

        answerData.votesCount =
          answerData.upVoteUserIds.length - answerData.downVoteUserIds.length;

        await PostsApi.updatePostAnswer(answerData.docId, {
          ...answerData,
          comments: [],
        });
      } else {
        answerData.upVoteUserIds = answerData.upVoteUserIds.filter(
          item => item !== this.rootStore.local.userId,
        );
        answerData.votesCount =
          answerData.upVoteUserIds.length - answerData.downVoteUserIds.length;

        await PostsApi.updatePostAnswer(answerData.docId, {
          ...answerData,
          comments: [],
        });
      }
    } catch (error) {
      console.log(['Error: onUpVote', error]);
    }
  };

  donwVoteAnswer = async (answer: AnswerType) => {
    let answerData = answer;
    try {
      if (
        !answerData.downVoteUserIds?.includes(
          this.rootStore.local.userId as never,
        )
      ) {
        answerData.downVoteUserIds = [
          ...answerData.downVoteUserIds,
          this.rootStore.local.userId,
        ] as never;
        if (
          answerData.upVoteUserIds?.includes(
            this.rootStore.local.userId as never,
          )
        ) {
          answerData.upVoteUserIds = answerData.upVoteUserIds.filter(
            item => item !== this.rootStore.local.userId,
          );
        }

        answerData.votesCount =
          answerData.upVoteUserIds.length - answerData.downVoteUserIds.length;

        await PostsApi.updatePostAnswer(answerData.docId, answerData);
      } else {
        answerData.downVoteUserIds = answerData.downVoteUserIds.filter(
          item => item !== this.rootStore.local.userId,
        );
        answerData.votesCount =
          answerData.upVoteUserIds.length - answerData.downVoteUserIds.length;

        await PostsApi.updatePostAnswer(answerData.docId, answerData);
      }
    } catch (error) {
      console.log(['Error: downVote'], error);
    }
  };

  onSelectTrueAnswer = async (answer: AnswerType) => {
    try {
      runInAction(() => {
        answer.isCorrect = !answer.isCorrect;
        this.state.postAnswers = this.state.postAnswers.map(item => {
          return item._id === answer._id
            ? {
                ...answer,
              }
            : item;
        });
      });
      console.log('answer', answer);

      await PostsApi.updatePostAnswer(answer.docId, answer);
    } catch (error) {
      console.log(['Error: onSelectTrueAnswer'], error);
    }
  };

  //comments

  fetchCommentsOfPost = (answerId: string) => {
    try {
      PostsApi.getPostComments(answerId, snapshot => {
        runInAction(() => {
          this.state.postComments = snapshot as never;
        });
      });
    } catch (error) {
      console.log(['Error: fetchAnswersOfPost'], error);
    }
  };

  onCreateCommentToPost = async () => {
    try {
      const user = await UsersApi.getUser(
        this.state.previewPost.userId as never,
      );
      if (!user || !user._id) {
        throw new Error('User not found');
      }

      runInAction(() => {
        this.state.replyComment = {
          ...this.state.replyComment,
          _id: nanoid(10),
          postId: this.state.previewPost._id,
          answerId: this.state.previewPost._id,
          type: 'comment',
          userId: this.state.previewPost.userId,
          title: this.state.newAnswerState.title,
          user: user as never,
        };
        if (!this.state.postComments) {
          this.state.postComments = [];
        }
        this.state.postComments.unshift({
          ...this.state.replyComment,
        });
        this.state.previewPost.comentsCount =
          this.state.previewPost.comentsCount += 1;
        if (
          !this.state.previewPost.commentUserIds?.includes(
            this.rootStore.local.userId as never,
          )
        ) {
          this.state.previewPost.commentUserIds = [
            ...this.state.previewPost.commentUserIds,
            this.rootStore.local.userId,
          ] as never;
        }
      });

      await PostsApi.addCommnetToPost({
        ...this.state.replyComment,
        user: {} as never,
      });

      this.onClearAnswerState();
      this.clearReplyCommentState();
      await PostsApi.updateViewPost(this.state.previewPost.docId, {
        ...this.state.previewPost,
        user: {} as never,
        topic: {} as never,
        comments: [] as never,
      });
    } catch (error) {
      console.log(['Error: onCreateCommentToPost'], error);
    }
  };

  setReplyPost = (post: Post, isReply: boolean) => {
    runInAction(() => {
      this.state.isReply = isReply;
      this.state.replyComment = {
        _id: nanoid(10),
        userId: post.userId,
        postId: post._id,
        answerId: post._id,
        createdAt: 0,
        type: 'comment',
        title: post.title,
        user: post.user,
        isCommentForAnswer: false,
      };
    });
  };

  setReplyAnswer = (answer: AnswerType, isReply: boolean) => {
    runInAction(() => {
      this.state.isReply = isReply;
      this.state.replyComment = {
        _id: nanoid(10),
        userId: answer.userId,
        postId: answer.postId,
        answerId: answer._id,
        createdAt: 0,
        type: 'comment',
        title: answer.title,
        user: answer.user,
        isCommentForAnswer: true,
      };
    });
  };

  clearReplyCommentState = () => {
    runInAction(() => {
      this.state.isReply = false;
      this.state.replyComment = CommentInitial as never;
    });
  };

  onReplyMessageHandle = async () => {
    const {type} = this.state.previewPost;
    const {replyComment} = this.state;

    if (
      type === 'Post' ||
      type === 'Poll' ||
      replyComment.answerId === this.state.previewPost._id
    ) {
      this.onCreateCommentToPost();
    } else if (type === 'Question' && replyComment.isCommentForAnswer) {
      this.onCreateNewCommentToAnswer();
    } else {
      this.onCreateNewAnswer();
    }
  };

  //poll vote

  onVoteToPollOption = async (optionId: string) => {
    try {
      runInAction(() => {
        if (
          !this.state.previewPost.pollVotedUserIds?.includes(
            this.rootStore.local.userId as never,
          )
        ) {
          this.state.previewPost.pollVotedUserIds.push(
            this.rootStore.local.userId as never,
          );

          this.state.previewPost.pollOptions =
            this.state.previewPost.pollOptions?.map(item => {
              return item.id === optionId
                ? {
                    ...item,
                    votedUserIds: [
                      ...item.votedUserIds,
                      this.rootStore.local.userId as never,
                    ],
                    votesCount: item.votesCount + 1,
                  }
                : item;
            });
        }
      });

      PostsApi.updateViewPost(this.state.previewPost.docId, {
        ...this.state.previewPost,
        user: {} as never,
        topic: {} as never,
        comments: [],
      });
    } catch (error) {
      console.log(['Error: onVoteToPollOption'], error);
    }
  };

  onVoteToPollOptionAtHome = async (post: Post, optionId: string) => {
    try {
      runInAction(() => {
        if (
          !post.pollVotedUserIds?.includes(this.rootStore.local.userId as never)
        ) {
          post.pollVotedUserIds.push(this.rootStore.local.userId as never);

          post.pollOptions = post.pollOptions?.map(item => {
            return item.id === optionId
              ? {
                  ...item,
                  votedUserIds: [
                    ...item.votedUserIds,
                    this.rootStore.local.userId as never,
                  ],
                  votesCount: item.votesCount + 1,
                }
              : item;
          });
        }
      });

      PostsApi.updateViewPost(post.docId, {
        ...post,
        user: {} as never,
        topic: {} as never,
        comments: [],
      });
    } catch (error) {
      console.log(['Error: onVoteToPollOptionAtHome'], error);
    }
  };
}
