import {makeAutoObservable, runInAction} from 'mobx';
import RootStore from './RootStore';
import {User, UserInitial} from '@types';
import UsersApi from 'shared/api/users.api';
import Loading from 'shared/utils/Loading';
import NavigationService from 'shared/navigation/NavigationService';

export interface UserStoreState {
  userState: User;
}

const initialState: UserStoreState = {
  userState: UserInitial,
};

export default class UserStore {
  state: UserStoreState = initialState;
  loadingWhenUserUpdate: Loading = new Loading();

  private readonly rootStore: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.rootStore = root;
    this.getUserInfo();
  }

  getUserInfo = async () => {
    if (!this.rootStore.local.userId) {
      return;
    }
    try {
      const res = await UsersApi.getUser(!this.rootStore.local.userId as never);
      if (res) {
        this.onGetUserState(res as never);
      }
    } catch (err) {
      console.log('Error-getUserInfo', err);
    }
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

  onFollowToUser = async (user: User) => {
    try {
      if (!user.followerIds?.includes(this.rootStore.local.userId as never)) {
        const newUserState = {
          ...user,
          followerIds: [
            ...user.followerIds,
            this.rootStore.local.userId as never,
          ],
        };
        await UsersApi.updateUser(user.docId, newUserState);
        const userData = await UsersApi.getUser(user._id);
        runInAction(() => {
          const newData = {
            ...this.rootStore.post.state.previewPost,
            user: userData,
          };
          this.rootStore.post.state.previewPost = newData as never;
        });
      } else {
        const newUserState = {
          ...user,
          followerIds: user.followerIds.filter(
            item => item !== this.rootStore.local.userId,
          ),
        };
        await UsersApi.updateUser(user.docId, newUserState);
        const userData = await UsersApi.getUser(user._id);
        runInAction(() => {
          const newData = {
            ...this.rootStore.post.state.previewPost,
            user: userData,
          };
          this.rootStore.post.state.previewPost = newData as never;
        });
      }
    } catch (error) {
      console.log(['Error: onFollowToUser'], error);
    }
  };
}
