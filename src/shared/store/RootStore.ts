import {makeAutoObservable} from 'mobx';
import RegisterStore from './RegisterStore';
import LocalStore from './LocalStore';

export default class RootStore {
  readonly register: RegisterStore;
  readonly local: LocalStore = new LocalStore();

  constructor() {
    makeAutoObservable(this);
    this.register = new RegisterStore(this);
  }
}
