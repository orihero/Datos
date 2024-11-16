import {makeAutoObservable} from 'mobx';

export default class Loading {
  loading: boolean = false;

  show = () => {
    this.loading = true;
  };

  hide = () => {
    this.loading = false;
  };

  constructor() {
    makeAutoObservable(this);
  }
}
