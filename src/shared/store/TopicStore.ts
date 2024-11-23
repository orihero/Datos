import {makeAutoObservable} from 'mobx';
import RootStore from './RootStore';
import {Topic, TopicInitial} from '@types';
import StorageApi from 'shared/api/storage.api';
import TopicApi from 'shared/api/topic.api';
import {Image} from 'react-native-svg';

export interface TopicStoreState {
  newTopicState: Topic;
}

const initialState: TopicStoreState = {
  newTopicState: TopicInitial,
};

export default class TopicStore {
  state: TopicStoreState = initialState;

  private readonly rootStore: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.rootStore = root;
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

  onImageSelectHandle = async (e: Image) => {
    try {
      const res = await StorageApi.uploadImage(e as never);
      console.log(['Succes: onImageSelectHandle'], res);
    } catch (error) {
      console.log(['Error: onImageSelectHandle'], error);
    }
  };

  onCreateNewTopic = async () => {
    try {
      this.state.newTopicState._id = String(Date.now());
      await TopicApi.addTopic(this.state.newTopicState);
    } catch (err) {
      console.log(['Error: onCreateNewTopic'], err);
    }
  };
}
