import {makeAutoObservable} from 'mobx';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export default class LocalStore {
  userId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getValuesFromDB = () => {
    const id = storage.getString('userId');
    if (id) {
      this.setUserId(id);
    }
  };
  setUserId = (id: string) => {
    this.userId = id;
    storage.set('userId', id);
  };

  clearUserId = () => {
    this.userId = null;
    storage.delete('userId');
  };
}
