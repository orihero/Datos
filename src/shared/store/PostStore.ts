import {makeAutoObservable} from 'mobx';
import RootStore from './RootStore';
import {Post, PostInitial} from '@types';

export interface PostStoreState {
  newPostState: Post;
}

const initialState: PostStoreState = {
  newPostState: {...PostInitial, type: 'Question'},
};

export default class PostStore {
  state: PostStoreState = initialState;

  private readonly rootStore: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.rootStore = root;
  }

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
}
