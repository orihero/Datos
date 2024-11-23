import {makeAutoObservable} from 'mobx';
import RegisterStore from './RegisterStore';
import LocalStore from './LocalStore';
import UserStore from './UserStore';
import PostStore from './PostStore';
import TopicStore from './TopicStore';

export default class RootStore {
  readonly register: RegisterStore;
  readonly user: UserStore;
  readonly post: PostStore;
  readonly topic: TopicStore;
  readonly local: LocalStore = new LocalStore();

  constructor() {
    makeAutoObservable(this);
    this.register = new RegisterStore(this);
    this.user = new UserStore(this);
    this.post = new PostStore(this);
    this.topic = new TopicStore(this);
  }
}
