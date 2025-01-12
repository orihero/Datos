import {makeAutoObservable} from 'mobx';
import RootStore from './RootStore';

export default class VisibleStore {
  visible = {
    previewUser: false,
    previewTopic: false,
    isMyPosts: true,
    alert: false,
    previewMedia: false,
    logoutConfirmation: false,
    deleteAccountConfirmation: false,
    reportModal: false,
    sortModal: false,
  };
  private readonly rootStore: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.rootStore = root;
  }

  show = (key: keyof typeof this.visible) => {
    this.visible[key] = true;
  };
  hide = (key: keyof typeof this.visible) => {
    this.visible[key] = false;
  };
  toggle = (key: keyof typeof this.visible) => {
    this.visible[key] = !this.visible[key];
  };
}
