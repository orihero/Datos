import {RegisterStoreState} from 'shared/store/RegisterStore';

export type User = RegisterStoreState['setup'] & {
  _id: string;
};
