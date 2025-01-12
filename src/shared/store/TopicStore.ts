import {makeAutoObservable, runInAction} from 'mobx';
import RootStore from './RootStore';
import {
  InterestInitial,
  InterestType,
  Post,
  SortType,
  SortTypeInitial,
  Topic,
  TopicInitial,
} from '@types';
import StorageApi from 'shared/api/storage.api';
import TopicApi from 'shared/api/topic.api';
import type {Asset} from 'react-native-image-picker';
import NavigationService from 'shared/navigation/NavigationService';
import Loading from 'shared/utils/Loading';
import {nanoid} from 'nanoid/non-secure';
import {HOME_STACK} from 'shared/navigation/routes';
import {debounce} from 'shared/constants/debounce';
import _ from 'lodash';

export interface TopicStoreState {
  allTopics: Topic[];
  allTopicsClone: Topic[];
  newTopicState: Topic;
  newAvatar: Asset;
  selectedCategory: InterestType;
  previewTopic: Topic;
  topicPosts: Post[];
  joinTopicLoading: {
    [id: string]: boolean;
  };
  isFetchTopicLoading: boolean;
  sortState: SortType;
}

const initialState: TopicStoreState = {
  allTopics: [],
  allTopicsClone: [],
  newTopicState: TopicInitial,
  newAvatar: {} as never,
  selectedCategory: InterestInitial,
  previewTopic: TopicInitial,
  topicPosts: [],
  joinTopicLoading: {},
  isFetchTopicLoading: false,
  sortState: SortTypeInitial,
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

  onChangeOfSortState = <T extends keyof TopicStoreState['sortState']>(
    key: T,
    value: TopicStoreState['sortState'][T],
  ) => {
    runInAction(() => {
      this.state.sortState[key] = value;
    });
  };

  fetchAllTopics = async () => {
    try {
      runInAction(() => {
        this.state.isFetchTopicLoading = true;
      });
      TopicApi.getAllTopics(snapshot => {
        const sortedAndRandomizedTopics = snapshot?.sort(
          (a, b) =>
            b.postIds.length +
            b.followerIds.length -
            (a.postIds.length + a.followerIds.length),
        );

        runInAction(() => {
          this.state.allTopics = sortedAndRandomizedTopics as never;
          this.state.allTopicsClone = sortedAndRandomizedTopics as never;
          this.state.isFetchTopicLoading = false;
        });
      });
    } catch (err) {
      console.log(['Error: fetchAllTopics', err]);
    }
  };

  fetchRefreshAllTopics = async () => {
    try {
      runInAction(() => {
        this.state.isFetchTopicLoading = true;
      });
      TopicApi.getAllTopics(snapshot => {
        const sortedAndRandomizedTopics = _.shuffle(
          snapshot?.sort(
            (a, b) =>
              b.postIds.length +
              b.followerIds.length -
              (a.postIds.length + a.followerIds.length),
          ),
        );

        runInAction(() => {
          this.state.allTopics = sortedAndRandomizedTopics as never;
          this.state.allTopicsClone = sortedAndRandomizedTopics as never;
          this.state.isFetchTopicLoading = false;
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

  onFollowToTopic = async (topic: Topic, where?: string) => {
    try {
      runInAction(() => {
        this.state.joinTopicLoading = {
          [topic._id]: true,
        };
      });
      if (!topic.followerIds?.includes(this.rootStore.local.userId as never)) {
        topic = {
          ...topic,
          followerIds: [
            ...topic.followerIds,
            this.rootStore.local.userId as never,
          ],
        };
        await TopicApi.followTopic(topic.docId, topic);
        this.rootStore.post.fetchJoinedPost(
          this.rootStore.local.userId as never,
        );
      } else {
        topic = {
          ...topic,
          followerIds: topic.followerIds.filter(
            item => item !== this.rootStore.local.userId,
          ),
        };
        await TopicApi.followTopic(topic.docId, topic);
        this.rootStore.post.fetchJoinedPost(
          this.rootStore.local.userId as never,
        );
      }
      setTimeout(() => {
        if (where === 'allPosts') {
          runInAction(() => {
            const newData = this.rootStore.post.state.allPosts?.map(item =>
              item.topicId === topic?._id ? {...item, topic: topic} : item,
            );
            this.rootStore.post.state.allPosts = newData as never;
          });
        }
        if (where === 'explore') {
          runInAction(() => {
            const newData = this.state.allTopics?.map(item =>
              item._id === topic?._id ? {...item, topic: topic} : item,
            );
            this.state.allTopics = newData as never;
          });
        }
        if (where === 'previewUserPosts') {
          runInAction(() => {
            const newData = this.rootStore.user.state.previewUserPosts?.map(
              item =>
                item.topicId === topic?._id ? {...item, topic: topic} : item,
            );
            this.rootStore.user.state.previewUserPosts = newData as never;
          });
        }
        if (where === 'previewPosts') {
          runInAction(() => {
            this.rootStore.post.state.previewPost.topic = topic as never;
          });
        }
        if (where === 'previewTopic') {
          runInAction(() => {
            this.state.previewTopic = topic as never;
          });
        }
      }, 200);
    } catch (error) {
      console.log(['Error: onFollowToTopic'], error);
    } finally {
      setTimeout(() => {
        runInAction(() => {
          this.state.joinTopicLoading = {
            [topic._id]: false,
          };
        });
      }, 200);
    }
  };

  onFollowToTopicWhichEntered = async (topic: Topic) => {
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
        runInAction(() => {
          this.rootStore.post.state.previewPost.topic = newTopic as never;
        });
      } else {
        const newTopic = {
          ...topic,
          followerIds: topic.followerIds.filter(
            item => item !== this.rootStore.local.userId,
          ),
        };
        await TopicApi.followTopic(topic.docId, newTopic);
        runInAction(() => {
          this.rootStore.post.state.previewPost.topic = newTopic as never;
        });
      }
    } catch (error) {
      console.log(['Error: onFollowToTopicWichEntered'], error);
    }
  };

  onSelectCategory = (category: InterestType) => {
    runInAction(() => {
      this.state.selectedCategory = category;
    });
  };
  onRemoveSelectedCategory = () => {
    runInAction(() => {
      this.state.selectedCategory = InterestInitial;
    });
  };

  onFetchTopicPosts = async (topicId: string) => {
    TopicApi.getTopicPosts(topicId, posts => {
      runInAction(() => {
        this.state.topicPosts = posts as never;
      });
    });
  };

  onFetchTopicsFollowByMe = async (userUid: string) => {
    TopicApi.fetchUsersFollowersToTopic(userUid, topics => {
      runInAction(() => {
        this.rootStore.user.state.topicsFollowedByMe = topics as never;
      });
    });
  };

  onSetPreviewTopic = (topic: Topic) => {
    runInAction(() => {
      this.state.previewTopic = topic;
    });
    this.onFetchTopicPosts(topic._id);
    setTimeout(() => {
      this.loadingWhenCreateTopic.hide();
      NavigationService.navigate(HOME_STACK.PREVIEW_TOPIC);
      this.rootStore.visible.hide('previewMedia');
    }, 200);
  };

  setSearchHandle = debounce((key: string, activeTab: string) => {
    if (activeTab === 'topics') {
      runInAction(() => {
        this.state.allTopics = this.state.allTopicsClone.filter(i =>
          i.title?.trim().toLowerCase().includes(key.toLowerCase().trim()),
        );
      });
      if (!this.state.allTopics) {
        console.log('No such username exists');
      }
    }
    if (activeTab === 'posts') {
      runInAction(() => {
        this.rootStore.post.state.allPosts =
          this.rootStore.post.state.allPostsClonse.filter(i =>
            i.title?.trim().toLowerCase().includes(key.toLowerCase().trim()),
          );
      });
      if (!this.rootStore.post.state.allPosts) {
        console.log('No such username exists');
      }
    }
    if (activeTab === 'users') {
      runInAction(() => {
        this.rootStore.user.state.allUsers =
          this.rootStore.user.state.allUsersClone.filter(i =>
            i.nickname?.trim().toLowerCase().includes(key.toLowerCase().trim()),
          );
      });
      if (!this.rootStore.user.state.allUsers) {
        console.log('No such username exists');
      }
    }
  }, 800);

  onSortHandle = () => {
    runInAction(() => {
      if (this.state.sortState.byDate) {
        this.state.allTopics = this.state.allTopicsClone.sort(
          (a, b) => b.createdAt - a.createdAt,
        );
        this.rootStore.post.state.allPosts =
          this.rootStore.post.state.allPostsClonse.sort(
            (a, b) => b.createdAt - a.createdAt,
          );
        this.rootStore.user.state.allUsers =
          this.rootStore.user.state.allUsersClone.sort(
            (a, b) => b.createdAt - a.createdAt,
          );
      } else {
        this.state.allTopics = this.state.allTopicsClone;
        this.rootStore.post.state.allPosts =
          this.rootStore.post.state.allPostsClonse;
        this.rootStore.user.state.allUsers =
          this.rootStore.user.state.allUsersClone;
      }

      if (this.state.sortState.byViews) {
        this.rootStore.post.state.allPosts =
          this.rootStore.post.state.allPostsClonse.sort(
            (a, b) => b.viewUserIds.length - a.viewUserIds.length,
          );
      } else {
        this.rootStore.post.state.allPosts =
          this.rootStore.post.state.allPostsClonse;
      }

      if (this.state.sortState.byVotes) {
        this.rootStore.post.state.allPosts =
          this.rootStore.post.state.allPostsClonse.sort(
            (a, b) => b.votesCount - a.votesCount,
          );
      } else {
        this.rootStore.post.state.allPosts =
          this.rootStore.post.state.allPostsClonse;
      }

      if (this.state.sortState.bycomments) {
        this.rootStore.post.state.allPosts =
          this.rootStore.post.state.allPostsClonse.sort(
            (a, b) => b.commentsCount - a.commentsCount,
          );
      } else {
        this.rootStore.post.state.allPosts =
          this.rootStore.post.state.allPostsClonse;
      }

      if (this.state.sortState.byFollowers) {
        this.state.allTopics = this.state.allTopicsClone.sort(
          (a, b) => b.followerIds.length - a.followerIds.length,
        );
        this.rootStore.user.state.allUsers =
          this.rootStore.user.state.allUsersClone.sort(
            (a, b) => b.followerIds.length - a.followerIds.length,
          );
      } else {
        this.state.allTopics = this.state.allTopicsClone;
        this.rootStore.user.state.allUsers =
          this.rootStore.user.state.allUsersClone;
      }
    });
    this.rootStore.visible.hide('sortModal');
  };
}
