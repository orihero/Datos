import {makeAutoObservable} from 'mobx';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export default class LocalStore {
  userId: string | null = null;
  selectedInterest: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getValuesFromDB = () => {
    const id = storage.getString('userId');
    if (id) {
      this.setUserId(id);
    }

    const interests = storage.getString('selectedInterest');
    if (interests) {
      this.setSelectedInterest(JSON.parse(interests));
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

  // selectedInterest uchun metodlar
  setSelectedInterest = (interests: string[]) => {
    this.selectedInterest = interests;
    storage.set('selectedInterest', JSON.stringify(interests));
  };

  clearSelectedInterest = () => {
    this.selectedInterest = [];
    storage.delete('selectedInterest');
  };
}
