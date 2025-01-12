import {makeAutoObservable, runInAction} from 'mobx';
import RootStore from './RootStore';
import {AnswerType, Post, Topic, User, UserInitial} from '@types';
import UsersApi from 'shared/api/users.api';
import Loading from 'shared/utils/Loading';
import NavigationService from 'shared/navigation/NavigationService';
import PostsApi from 'shared/api/post.api';
import {BOTTOM_BAR_STACK, HOME_STACK} from 'shared/navigation/routes';

export interface UserStoreState {
  userState: User;
  myPosts: Post[];
  myAnswers: AnswerType[];
  myFollowers: User[];
  myFollowing: User[];
  topicsFollowedByMe: Topic[];
  previewUser: User;
  previewUserPosts: Post[];
  previewUserAnswers: AnswerType[];
  allUsers: User[];
  allUsersClone: User[];
  followUserLoading: {
    [uid: string]: boolean;
  };
  isFetchUserLoading: false;
  active: boolean;
}

const initialState: UserStoreState = {
  userState: UserInitial,
  myPosts: [],
  myAnswers: [],
  myFollowers: [],
  myFollowing: [],
  topicsFollowedByMe: [],
  previewUser: UserInitial,
  previewUserPosts: [],
  previewUserAnswers: [],
  allUsers: [],
  allUsersClone: [],
  followUserLoading: {},
  isFetchUserLoading: false,
  active: false,
};

export default class UserStore {
  state: UserStoreState = initialState;
  loadingWhenUserUpdate: Loading = new Loading();

  private readonly rootStore: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.rootStore = root;
    this.getUserInfo();
    this.fetchAllUsers();
  }

  setActiveUser = (value: boolean) => {
    runInAction(() => {
      this.state.active = value;
      console.log('this.state.active', this.state.active);
    });
  };

  fetchAllUsers = async () => {
    UsersApi.getAllUsers(users => {
      runInAction(() => {
        const filteredUsers =
          users?.filter(
            user => user.uid !== (this.rootStore.local.userId as never),
          ) || [];

        // Saralash: "point" bo'yicha kamayish tartibida
        const sortedUsers = filteredUsers.sort((a, b) => b.points - a.points);

        this.state.allUsers = sortedUsers;
        this.state.allUsersClone = sortedUsers;
      });
    });
  };

  getUserInfo = async () => {
    if (!this.rootStore.local.userId) {
      return;
    }
    try {
      const res = await UsersApi.getUser(this.rootStore.local.userId as never);
      if (res) {
        this.onGetUserState(res as never);
        this.getMyPosts();
        this.getMyAnswers();
        this.getMyFollowers(res?.followerIds);
        this.getMyFollowing(res?.uid);
        this.rootStore.topic.onFetchTopicsFollowByMe(res?.uid);
        this.rootStore.post.fetchJoinedPost(res?.uid);
      } else {
        this.rootStore.register.onSignOut();
      }
    } catch (err) {
      console.log('Error-getUserInfo', err);
    }
  };

  getMyPosts = async () => {
    if (!this.rootStore.local.userId) {
      return;
    }
    PostsApi.getMyPosts(this.rootStore.local.userId as never, posts => {
      runInAction(() => {
        this.state.myPosts = posts as never;
      });
    });
  };

  getMyAnswers = async () => {
    if (!this.rootStore.local.userId) {
      return;
    }
    try {
      PostsApi.getMyAnswers(this.rootStore.local.userId as never, asnwers => {
        runInAction(() => {
          this.state.myAnswers = asnwers as never;
        });
      });
    } catch (err) {
      console.log(['Errro: getMyasnwers'], err);
    }
  };

  getMyFollowers = async (followerIds: string[]) => {
    if (!this.rootStore.local.userId) {
      return;
    }
    UsersApi.fetchUsersByFollowerIdsWithSnapshot(followerIds, users => {
      runInAction(() => {
        this.state.myFollowers = users as never;
      });
    });
  };

  getMyFollowing = async (uid: string) => {
    if (!this.rootStore.local.userId) {
      return;
    }
    UsersApi.fetchUsersFollowingMe(uid, users => {
      runInAction(() => {
        this.state.myFollowing = users as never;
      });
    });
  };

  onGetUserState = (user: User) => {
    runInAction(() => {
      this.state.userState = user;
    });
  };

  onChangeOfUserState = <T extends keyof UserStoreState['userState']>(
    key: T,
    value: UserStoreState['userState'][T],
  ) => {
    this.state = {
      ...this.state,
      userState: {
        ...this.state.userState,
        [key]: value,
      },
    };
  };

  onUpdateUser = async () => {
    try {
      this.loadingWhenUserUpdate.show();
      await UsersApi.updateUser(
        this.state.userState.docId,
        this.state.userState,
      );
      setTimeout(() => {
        this.loadingWhenUserUpdate.hide();
        NavigationService.goBack();
      }, 200);
    } catch (err) {
      console.log(['Error:onUpdateUser'], err);
      this.loadingWhenUserUpdate.hide();
    } finally {
      setTimeout(() => {
        this.loadingWhenUserUpdate.hide();
      }, 200);
    }
  };

  onFollowToUser = async (user: User, where?: string) => {
    try {
      runInAction(() => {
        this.state.followUserLoading = {
          [user.uid]: true,
        };
      });
      if (!user) {
        user = UserInitial;
      }
      if (!user.followerIds?.includes(this.rootStore.local.userId as never)) {
        user = {
          ...user,
          followerIds: [
            ...user.followerIds,
            this.rootStore.local.userId as never,
          ],
        };
        await UsersApi.updateUser(user.docId, user);
      } else {
        user = {
          ...user,
          followerIds: user.followerIds.filter(
            item => item !== this.rootStore.local.userId,
          ),
        };

        await UsersApi.updateUser(user.docId, user);
      }
      setTimeout(() => {
        if (where === 'allPosts') {
          runInAction(() => {
            this.rootStore.post.state.allPosts =
              this.rootStore.post.state.allPosts?.map(item =>
                item.userId === user?.uid ? {...item, user: user} : item,
              );
          });
        }
        if (where === 'postPreview') {
          runInAction(() => {
            this.rootStore.post.state.previewPost.user = user;
          });
        }
        if (where === 'previewUser') {
          runInAction(() => {
            this.rootStore.user.state.previewUser = user;
          });
        }
        if (where === 'previewTopicPosts') {
          runInAction(() => {
            this.rootStore.topic.state.topicPosts =
              this.rootStore.topic.state.topicPosts?.map(item =>
                item.user?.uid === user.uid ? {...item, user: user} : item,
              );
          });
        }
      }, 200);
    } catch (error) {
      console.log(['Error: onFollowToUser'], error);
    } finally {
      setTimeout(() => {
        runInAction(() => {
          this.state.followUserLoading = {
            [user.uid]: false,
          };
        });
      }, 200);
    }
  };

  setPreviewUser = async (userId: string) => {
    const user = await UsersApi.getUser(userId);
    runInAction(() => {
      this.state.previewUser = user as never;
    });
    PostsApi.getMyPosts(userId as never, posts => {
      runInAction(() => {
        this.state.previewUserPosts = posts as never;
      });
    });
    PostsApi.getMyAnswers(userId as never, answers => {
      runInAction(() => {
        this.state.previewUserAnswers = answers as never;
      });
    });
    setTimeout(() => {
      if (userId === this.rootStore.local.userId) {
        NavigationService.navigate(BOTTOM_BAR_STACK.PROFILE);
        this.rootStore.visible.hide('previewMedia');
      } else {
        NavigationService.navigate(HOME_STACK.PREVIEW_USER);
        this.rootStore.visible.hide('previewMedia');
      }
    }, 200);
  };
}
