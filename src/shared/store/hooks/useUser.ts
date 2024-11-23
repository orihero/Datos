import {useCallback, useEffect, useState} from 'react';
import {useLocalStore} from './useLocalStore';
import UsersApi from 'shared/api/users.api';
import {User} from '@types';
import {useRootStore} from './useRootStore';

export const useUser = () => {
  const {userId} = useLocalStore();
  const {onGetUserState} = useRootStore().user;
  const [user, setUser] = useState<User>({} as User);

  const getUserInfo = useCallback(async () => {
    if (!userId) {
      return;
    }
    try {
      const res = await UsersApi.getUser(userId);
      if (res) {
        setUser(res as User);
        onGetUserState(res as never);
      }
    } catch (err) {
      console.log('Error-getUserInfo', err);
    }
  }, [onGetUserState, userId]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return {
    user,
  };
};
