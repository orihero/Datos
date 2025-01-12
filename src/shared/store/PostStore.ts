import {makeAutoObservable, runInAction} from 'mobx';
import RootStore from './RootStore';
import {
  AnswerInitial,
  AnswerType,
  CommentInitial,
  CommentType,
  Post,
  PostInitial,
  ReportInitial,
  ReportType,
  Topic,
  User,
} from '@types';
import PostsApi from 'shared/api/post.api';
import Loading from 'shared/utils/Loading';
import NavigationService from 'shared/navigation/NavigationService';
import {HOME_STACK, ROOT_STACK} from 'shared/navigation/routes';
import type {Asset} from 'react-native-image-picker';
import StorageApi from 'shared/api/storage.api';
import {nanoid} from 'nanoid/non-secure';
import UsersApi from 'shared/api/users.api';
import TopicApi from 'shared/api/topic.api';
import _ from 'lodash';

export interface PostStoreState {
  newPostState: Post;
  newPostMediaUrl: Asset;
  newAnswerState: AnswerType;
  newCommentToAnswerState: CommentType;
  postAnswers: AnswerType[];
  postComments: CommentType[];
  postId: string;
  allPosts: Post[];
  allPostsClonse: Post[];
  previewPost: Post;
  postType: string;
  replyComment: CommentType;
  isReply: boolean;
  reportMessage: ReportType;
  reportLoading: boolean;
  isLoading: boolean;
  isLoadingHome: boolean;
  joinedPosts: Post[];
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
  allPostsClonse: [],
  previewPost: {} as never,
  postType: '',
  replyComment: CommentInitial as never,
  isReply: false,
  reportMessage: ReportInitial,
  reportLoading: false,
  isLoading: false,
  isLoadingHome: false,
  joinedPosts: [],
};

export default class PostStore {
  state: PostStoreState = initialState;
  loadingWhenCreatePost: Loading = new Loading();

  private readonly rootStore: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.rootStore = root;
    this.fetchAllPost();
    this.fetchJoinedPost(this.rootStore.local.userId as never);
  }

  //post

  fetchAllPost = async () => {
    try {
      runInAction(() => {
        this.state.isLoading = true;
      });

      const res = await PostsApi.getAllPosts();
      const sortedAndRandomizedPosts = _.shuffle(
        res?.sort((a, b) => b.rate - a.rate),
      );
      runInAction(() => {
        this.state.allPosts = sortedAndRandomizedPosts as never;
        this.state.allPostsClonse = sortedAndRandomizedPosts as never;
        this.state.isLoading = false;
      });
    } catch (err) {
      console.log(['Error: fetchAllTopics', err]);
      runInAction(() => {
        this.state.isLoading = false;
      });
    }
  };

  fetchJoinedPost = async (uid: string) => {
    try {
      runInAction(() => {
        this.state.isLoadingHome = true;
      });

      const res = await PostsApi.getUserFollowedTopicsPosts(uid);
      const sortedAndRandomizedPosts = _.shuffle(
        res?.sort((a, b) => b.rate - a.rate),
      );
      runInAction(() => {
        this.state.joinedPosts = sortedAndRandomizedPosts as never;
        this.state.isLoadingHome = false;
      });
    } catch (err) {
      console.log(['Error: fetchAllTopics', err]);
      runInAction(() => {
        this.state.isLoadingHome = false;
      });
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
      this.state.newPostMediaUrl = {...file, type: file.type?.split('/')[0]};
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

      let user: User = (await UsersApi.getUser(
        this.rootStore.local.userId as never,
      )) as never;
      if (!user || !user._id) {
        throw new Error('User not found');
      }
      runInAction(() => {
        this.state.newPostState = {
          ...this.state.newPostState,
          _id: nanoid(10),
          topicId: this.state.newPostState?.topic._id,
          userId: this.rootStore.local.userId as never,
          createdAt: Date.now(),
        };
      });

      user.postsIds.unshift(this.state.newPostState._id);

      this.state.newPostState?.topic?.postIds?.unshift(
        this.state.newPostState?._id,
      );

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
        runInAction(() => {
          this.state.newPostState.pollEndDays = null as never;
          this.state.newPostState.pollOptions = null as never;
        });
      }
      await PostsApi.addPost({...this.state.newPostState, topic: {} as never});
      await TopicApi.updateTopic(
        this.state.newPostState.topic.docId,
        this.state.newPostState.topic,
      );
      await UsersApi.updateUser(user.docId, user);
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

  getPostById = async (
    postId: string,
    postType: string,
    callback?: boolean,
  ) => {
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
        callback && NavigationService.navigate(HOME_STACK.ANSWER);
      }, 200);
      this.fetchAnswersOfPost(postId);
      this.fetchCommentsOfPost(postId);
      if (onePost.viewUserIds?.includes(userId)) {
        return;
      } else {
        const newUserIds = [...onePost.viewUserIds, userId];
        runInAction(() => {
          this.state.previewPost.viewUserIds = newUserIds;
        });
        if (
          this.state.previewPost.userId !==
          (this.rootStore.local.userId as never)
        ) {
          runInAction(() => {
            this.state.previewPost.user.points += 10;
            this.state.previewPost.rate += 0.5;
          });
          console.log('ishladi', this.state.previewPost.user.points);

          await UsersApi.updateUser(
            this.state.previewPost.user.docId,
            this.state.previewPost.user,
          );
        }
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
      if (postData.userId !== (this.rootStore.local.userId as never)) {
        if (
          !postData.upVoteUserIds?.includes(
            this.rootStore.local.userId as never,
          )
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
            runInAction(() => {
              postData.downVoteUserIds = postData.downVoteUserIds.filter(
                item => item !== this.rootStore.local.userId,
              );
              postData.user.points += 100;
              this.rootStore.user.state.userState.usedVotes -= 1;
            });
          }

          postData.votesCount =
            postData.upVoteUserIds.length - postData.downVoteUserIds.length;
          postData.rate += 1;

          await PostsApi.updateViewPost(postData.docId, {
            ...postData,
            user: {} as never,
            topic: {} as never,
            comments: [] as never,
          });

          this.getUpdateChanges(postData._id);

          runInAction(() => {
            postData.user.points += 100;
          });

          await UsersApi.updateUser(postData.user.docId, postData.user);

          runInAction(() => {
            this.rootStore.user.state.userState.usedVotes += 1;
          });
          await UsersApi.updateUser(
            this.rootStore.user.state.userState.docId,
            this.rootStore.user.state.userState,
          );
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

          runInAction(() => {
            postData.user.points -= 100;
          });

          await UsersApi.updateUser(postData.user.docId, postData.user);

          runInAction(() => {
            this.rootStore.user.state.userState.usedVotes -= 1;
          });
          await UsersApi.updateUser(
            this.rootStore.user.state.userState.docId,
            this.rootStore.user.state.userState,
          );
        }
        this.rootStore.visible.show('alert');
      }
    } catch (error) {
      console.log(['Error: onUpVote', error]);
    } finally {
      setTimeout(() => {
        this.rootStore.visible.hide('alert');
      }, 3000);
    }
  };

  donwVote = async (post: Post) => {
    let postData = post;
    try {
      if (postData.userId !== (this.rootStore.local.userId as never)) {
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
            postData.upVoteUserIds?.includes(
              this.rootStore.local.userId as never,
            )
          ) {
            runInAction(() => {
              postData.upVoteUserIds = postData.upVoteUserIds.filter(
                item => item !== this.rootStore.local.userId,
              );
              postData.user.points -= 10;
              this.rootStore.user.state.userState.usedVotes -= 1;
            });
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

          runInAction(() => {
            postData.user.points -= 10;
          });

          await UsersApi.updateUser(postData.user.docId, postData.user);

          runInAction(() => {
            this.rootStore.user.state.userState.usedVotes += 1;
          });
          await UsersApi.updateUser(
            this.rootStore.user.state.userState.docId,
            this.rootStore.user.state.userState,
          );
        } else {
          postData.downVoteUserIds = postData.downVoteUserIds.filter(
            item => item !== this.rootStore.local.userId,
          );
          postData.votesCount =
            postData.upVoteUserIds.length - postData.downVoteUserIds.length;

          runInAction(() => {
            postData.user.points += 10;
            this.rootStore.user.state.userState.usedVotes -= 1;
          });

          await PostsApi.updateViewPost(postData.docId, {
            ...postData,
            user: {} as never,
            topic: {} as never,
            comments: [],
          });

          this.getUpdateChanges(postData._id);

          await UsersApi.updateUser(postData.user.docId, postData.user);

          await UsersApi.updateUser(
            this.rootStore.user.state.userState.docId,
            this.rootStore.user.state.userState,
          );
        }
        this.rootStore.visible.show('alert');
      }
    } catch (error) {
      console.log(['Error: downVote'], error);
    } finally {
      setTimeout(() => {
        this.rootStore.visible.hide('alert');
      }, 3000);
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
      let user: User = (await UsersApi.getUser(
        this.rootStore.local.userId as never,
      )) as never;
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
          userId: user.uid as never,
          user: user as never,
          createdAt: Date.now(),
        };

        user.answersIds.unshift(this.state.newAnswerState._id);

        if (!this.state.postAnswers) {
          this.state.postAnswers = [];
        }
        this.state.postAnswers = [
          this.state.newAnswerState,
          ...this.state.postAnswers,
        ];

        this.state.previewPost = {
          ...this.state.previewPost,
          commentsCount: this.state.previewPost.commentsCount + 1,
          rate: this.state.previewPost.rate + 0.3,
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

      await UsersApi.updateUser(user.docId, user);

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

        this.state.previewPost = {
          ...this.state.previewPost,
          commentsCount: this.state.previewPost.commentsCount + 1,
          rate: this.state.previewPost.rate + 0.3,
        };
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
      if (answerData.userId !== (this.rootStore.local.userId as never)) {
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
            answerData.user.points += 10;
            this.rootStore.user.state.userState.usedVotes -= 1;
          }

          answerData.votesCount =
            answerData.upVoteUserIds.length - answerData.downVoteUserIds.length;

          if (answerData.userId !== (this.rootStore.local.userId as never)) {
            runInAction(() => {
              answerData.user.points += 10;
            });
            // console.log('ishladi', answerData.user.points);

            await UsersApi.updateUser(answerData.user.docId, answerData.user);
          }

          await PostsApi.updatePostAnswer(answerData.docId, {
            ...answerData,
            comments: [],
            user: {} as never,
          });

          runInAction(() => {
            this.rootStore.user.state.userState.usedVotes += 1;
          });
          await UsersApi.updateUser(
            this.rootStore.user.state.userState.docId,
            this.rootStore.user.state.userState,
          );
        } else {
          answerData.upVoteUserIds = answerData.upVoteUserIds.filter(
            item => item !== this.rootStore.local.userId,
          );
          answerData.votesCount =
            answerData.upVoteUserIds.length - answerData.downVoteUserIds.length;

          runInAction(() => {
            answerData.user.points -= 10;
          });

          await UsersApi.updateUser(answerData.user.docId, answerData.user);

          await PostsApi.updatePostAnswer(answerData.docId, {
            ...answerData,
            comments: [],
            user: {} as never,
          });

          runInAction(() => {
            this.rootStore.user.state.userState.usedVotes -= 1;
          });
          await UsersApi.updateUser(
            this.rootStore.user.state.userState.docId,
            this.rootStore.user.state.userState,
          );
        }
        this.rootStore.visible.show('alert');
      }
    } catch (error) {
      console.log(['Error: onUpVote', error]);
    } finally {
      setTimeout(() => {
        this.rootStore.visible.hide('alert');
      }, 3000);
    }
  };

  donwVoteAnswer = async (answer: AnswerType) => {
    let answerData = answer;

    try {
      if (answerData.userId !== (this.rootStore.local.userId as never)) {
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
            answerData.user.points -= 10;
            this.rootStore.user.state.userState.usedVotes -= 1;
          }

          answerData.votesCount =
            answerData.upVoteUserIds.length - answerData.downVoteUserIds.length;

          runInAction(() => {
            answerData.user.points -= 10;
          });

          await UsersApi.updateUser(answerData.user.docId, answerData.user);

          await PostsApi.updatePostAnswer(answerData.docId, {
            ...answerData,
            user: {} as never,
            comments: [],
          });

          runInAction(() => {
            this.rootStore.user.state.userState.usedVotes += 1;
          });
          await UsersApi.updateUser(
            this.rootStore.user.state.userState.docId,
            this.rootStore.user.state.userState,
          );
        } else {
          answerData.downVoteUserIds = answerData.downVoteUserIds.filter(
            item => item !== this.rootStore.local.userId,
          );
          answerData.votesCount =
            answerData.upVoteUserIds.length - answerData.downVoteUserIds.length;

          runInAction(() => {
            answerData.user.points += 10;
          });

          await UsersApi.updateUser(answerData.user.docId, answerData.user);

          await PostsApi.updatePostAnswer(answerData.docId, {
            ...answerData,
            user: {} as never,
            comments: [],
          });

          runInAction(() => {
            this.rootStore.user.state.userState.usedVotes -= 1;
          });
          await UsersApi.updateUser(
            this.rootStore.user.state.userState.docId,
            this.rootStore.user.state.userState,
          );
        }
        this.rootStore.visible.show('alert');
      }
    } catch (error) {
      console.log(['Error: downVote'], error);
    } finally {
      setTimeout(() => {
        this.rootStore.visible.hide('alert');
      }, 3000);
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

      await PostsApi.updatePostAnswer(answer.docId, {
        ...answer,
        user: {} as never,
        comments: [],
      });
    } catch (error) {
      console.log(['Error: onSelectTrueAnswer'], error);
    }
  };

  //comments

  fetchCommentsOfPost = (answerId: string) => {
    try {
      console.log('answerId', answerId);

      PostsApi.getPostComments(answerId, snapshot => {
        runInAction(() => {
          this.state.postComments = snapshot as never;
          console.log('this.state.postComments', this.state.postComments);
        });
      });
    } catch (error) {
      console.log(['Error: fetchAnswersOfPost'], error);
    }
  };

  onCreateCommentToPost = async () => {
    try {
      const user = await UsersApi.getUser(this.rootStore.local.userId as never);
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
          userId: user.uid,
          title: this.state.newAnswerState.title,
          user: user as never,
          createdAt: Date.now(),
        };
        if (!this.state.postComments) {
          this.state.postComments = [];
        }
        this.state.postComments = [
          this.state.replyComment,
          ...this.state.postComments,
        ];
        this.state.previewPost.commentsCount =
          this.state.previewPost.commentsCount += 1;
        this.state.previewPost.rate = this.state.previewPost.rate += 0.3;
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
        userId: this.rootStore.local.userId as never,
        postId: post._id,
        answerId: post._id,
        createdAt: Date.now(),
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
        userId: this.rootStore.local.userId as never,
        postId: answer.postId,
        answerId: answer._id,
        createdAt: Date.now(),
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
                    rate: this.state.previewPost.rate + 0.5,
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
                  rate: post.rate + 0.5,
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

  //report
  setReportMessage = <T extends keyof PostStoreState['reportMessage']>(
    key: T,
    value: PostStoreState['reportMessage'][T],
  ) => {
    this.state = {
      ...this.state,
      reportMessage: {
        ...this.state.reportMessage,
        [key]: value,
      },
    };
  };

  onReportToPost = async () => {
    try {
      runInAction(() => {
        this.state.reportLoading = true;
        this.state.reportMessage = {
          ...this.state.reportMessage,
          id: nanoid(10),
          createdAt: Date.now(),
          userId: this.rootStore.local.userId as never,
        };
      });
      await PostsApi.addReport(this.state.reportMessage);
      setTimeout(() => {
        runInAction(() => {
          this.state.reportLoading = false;
          this.rootStore.visible.hide('reportModal');
        });
        this.clearReportMessage();
      }, 200);
    } catch (error) {
      console.log('Error: onReportToPost', error);
    } finally {
      setTimeout(() => {
        runInAction(() => {
          this.state.reportLoading = false;
        });
      }, 200);
    }
  };

  clearReportMessage = () => {
    runInAction(() => {
      this.state.reportMessage = ReportInitial;
    });
  };
}
