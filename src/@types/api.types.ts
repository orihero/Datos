import {RegisterStoreState} from 'shared/store/RegisterStore';

export type User = RegisterStoreState['setup'] & {
  _id: string;
  createAt: number;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  userImageUrl: string;
};
