import {makeAutoObservable} from 'mobx';
import RegisterStore from './RegisterStore';

export default class RootStore {
  readonly register: RegisterStore;

  constructor() {
    makeAutoObservable(this);
    this.register = new RegisterStore(this);
  }
}
