import {InterestType} from '@types';
import {makeAutoObservable, runInAction} from 'mobx';
import {MMKV} from 'react-native-mmkv';
import {FetchInterestsApi} from 'shared/api/interests.api';
import i18n from 'localization/i18n';

export const storage = new MMKV();

export default class LocalStore {
  userId: string | null = null;
  selectedInterest: string[] = [];
  allInterests: InterestType[] = [];
  currentLanguage: string = i18n?.language;

  constructor() {
    makeAutoObservable(this);
    this.fetchInterests();
  }

  fetchInterests = async () => {
    try {
      const documentSnapshot = await FetchInterestsApi();
      runInAction(() => {
        this.allInterests = documentSnapshot as never;
      });
    } catch (error) {
      console.error('Error fetching interests:', error);
    }
  };

  setLanguage = (lang: string) => {
    runInAction(() => {
      this.currentLanguage = lang;
      i18n.changeLanguage(lang);
    });
  };

  getValuesFromDB = () => {
    const id = storage.getString('userId');
    if (id) {
      this.setUserId(id);
    }

    const savedLang = storage.getString('language');

    if (savedLang) {
      i18n.changeLanguage(savedLang);
      this.setLanguage(savedLang);
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
