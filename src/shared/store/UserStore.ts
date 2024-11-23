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
  }

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
}
