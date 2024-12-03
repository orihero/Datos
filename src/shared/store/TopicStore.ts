import {makeAutoObservable, runInAction} from 'mobx';
import RootStore from './RootStore';
import {Topic, TopicInitial} from '@types';
import StorageApi from 'shared/api/storage.api';
import TopicApi from 'shared/api/topic.api';
import type {Asset} from 'react-native-image-picker';
import NavigationService from 'shared/navigation/NavigationService';
import Loading from 'shared/utils/Loading';
import {nanoid} from 'nanoid/non-secure';

export interface TopicStoreState {
  allTopics: Topic[];
  newTopicState: Topic;
  newAvatar: Asset;
}

const initialState: TopicStoreState = {
  allTopics: [],
  newTopicState: TopicInitial,
  newAvatar: {} as never,
};

export default class TopicStore {
  state: TopicStoreState = initialState;
  loadingWhenCreateTopic: Loading = new Loading();
  loadingWhenPutAvatar: Loading = new Loading();

  private readonly rootStore: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.rootStore = root;
    this.fetchAllTopics();
  }

  onChangeOfNewTopicState = <T extends keyof TopicStoreState['newTopicState']>(
    key: T,
    value: TopicStoreState['newTopicState'][T],
  ) => {
    this.state = {
      ...this.state,
      newTopicState: {
        ...this.state.newTopicState,
        [key]: value,
      },
    };
  };

  fetchAllTopics = async () => {
    try {
      TopicApi.getAllTopics(snapshot => {
        runInAction(() => {
          this.state.allTopics = snapshot as never;
        });
      });
    } catch (err) {
      console.log(['Error: fetchAllTopics', err]);
    }
  };

  onImageSelectHandle = async (e: Asset) => {
    try {
      const res = await StorageApi.uploadImage(e as never);
      console.log(['Succes: onImageSelectHandle'], res);
    } catch (error) {
      console.log(['Error: onImageSelectHandle'], error);
    }
  };

  onSelectTopicAvatar = (file: Asset) => {
    runInAction(() => {
      this.state.newAvatar = file;
    });
  };

  onCreateNewTopic = async () => {
    try {
      this.loadingWhenCreateTopic.show();
      this.state.newTopicState._id = nanoid(10);
      this.state.newTopicState.userId = this.rootStore.local.userId as never;
      this.loadingWhenPutAvatar.show();
      const res = await StorageApi.uploadImage({
        file: this.state.newAvatar,
      } as never);
      this.loadingWhenPutAvatar.hide();
      this.state.newTopicState.avatar = res as never;
      await TopicApi.addTopic(this.state.newTopicState);
      const addedTopic = await TopicApi.getTopic(this.state.newTopicState._id);
      runInAction(() => {
        this.rootStore.post.state.newPostState.topic = addedTopic as never;
      });
      setTimeout(() => {
        this.loadingWhenCreateTopic.hide();
        NavigationService.goBack();
      }, 200);
      runInAction(() => {
        this.state.newAvatar = {};
        this.state.newTopicState = TopicInitial;
      });
    } catch (err) {
      console.log(['Error: onCreateNewTopic'], err);
      this.loadingWhenCreateTopic.hide();
    } finally {
      setTimeout(() => {
        this.loadingWhenCreateTopic.hide();
      }, 200);
    }
  };

  onFollowToTopic = async (topic: Topic) => {
    try {
      if (!topic.followerIds?.includes(this.rootStore.local.userId as never)) {
        const newTopic = {
          ...topic,
          followerIds: [
            ...topic.followerIds,
            this.rootStore.local.userId as never,
          ],
        };
        await TopicApi.followTopic(topic.docId, newTopic);
        const topicData = await TopicApi.getTopic(topic._id);
        runInAction(() => {
          const newData = this.rootStore.post.state.allPosts?.map(item =>
            item.topicId === topicData?._id
              ? {...item, topic: topicData}
              : item,
          );
          this.rootStore.post.state.allPosts = newData as never;
        });
      } else {
        const newTopic = {
          ...topic,
          followerIds: topic.followerIds.filter(
            item => item !== this.rootStore.local.userId,
          ),
        };
        await TopicApi.followTopic(topic.docId, newTopic);
        const topicData = await TopicApi.getTopic(topic._id);
        runInAction(() => {
          const newData = this.rootStore.post.state.allPosts?.map(item =>
            item.topicId === topicData?._id
              ? {...item, topic: topicData}
              : item,
          );
          this.rootStore.post.state.allPosts = newData as never;
        });
      }
    } catch (error) {
      console.log(['Error: onFollowToTopic'], error);
    }
  };
}
