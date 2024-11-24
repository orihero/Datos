import {makeAutoObservable, runInAction} from 'mobx';
import RootStore from './RootStore';
import {Post, PostInitial, Topic} from '@types';
import PostsApi from 'shared/api/post.api';
import Loading from 'shared/utils/Loading';
import NavigationService from 'shared/navigation/NavigationService';
import {ROOT_STACK} from 'shared/navigation/routes';
import type {Asset} from 'react-native-image-picker';
import StorageApi from 'shared/api/storage.api';

export interface PostStoreState {
  newPostState: Post;
  newPostMediaUrls: Asset[];
}

const initialState: PostStoreState = {
  newPostState: PostInitial,
  newPostMediaUrls: [],
};

export default class PostStore {
  state: PostStoreState = initialState;
  loadingWhenCreatePost: Loading = new Loading();

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

  onSelectNewPostMediaUrls = (file: Asset[]) => {
    runInAction(() => {
      this.state.newPostMediaUrls = [...this.state.newPostMediaUrls, ...file];
    });
  };

  onRemoveNewPostMediaUrls = (uri: string) => {
    runInAction(() => {
      this.state.newPostMediaUrls = this.state.newPostMediaUrls.filter(
        item => item.uri !== uri,
      );
    });
  };

  onCreatePost = async () => {
    try {
      this.loadingWhenCreatePost.show();
      this.state.newPostState._id = String(Date.now());
      this.state.newPostState.userId = this.rootStore.local.userId as never;

      // Image upload qilishni asinxron ravishda boshqarish
      const uploadedImages = await Promise.all(
        this.state.newPostMediaUrls.map(async item => {
          const res = await StorageApi.uploadImage({
            file: item,
          } as never);
          return res as never; // Har bir yuklangan rasmni qaytaradi
        }),
      );

      // Yuklangan rasmlarni `images` ga qo'shish
      runInAction(() => {
        this.state.newPostState.images = uploadedImages;
      });

      // Postni saqlash
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
      if (
        this.state.newPostState.topics.every(item => item?._id !== topic?._id)
      ) {
        this.state.newPostState.topics = [
          ...this.state.newPostState.topics,
          topic,
        ];
      }
    });
  };

  onRemoveTopic = (id: string) => {
    runInAction(() => {
      if (this.state.newPostState.topics.some(item => item._id === id)) {
        this.state.newPostState.topics = this.state.newPostState.topics.filter(
          item => item._id !== id,
        );
      }
    });
  };

  onClearPostData = () => {
    runInAction(() => {
      this.state.newPostState = PostInitial;
      this.state.newPostMediaUrls = [];
    });
  };
}
