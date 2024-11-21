import {useCallback, useEffect, useState} from 'react';
import {useLocalStore} from './useLocalStore';
import UsersApi from 'shared/api/users.api';
import {User} from '@types';

export const useUser = () => {
  const {userId} = useLocalStore();
  const [user, setUser] = useState<User>({} as User);

  const getUserInfo = useCallback(async () => {
    if (!userId) {
      return;
    }
    try {
      const res = await UsersApi.getUser(userId);
      if (res) {
        setUser(res as User);
      }
    } catch (err) {
      console.log('Error-getUserInfo', err);
    }
  }, [userId]);

  const updateUser = useCallback(
    async (newData: Partial<User>) => {
      if (!userId) {
        return;
      }
      try {
        const updatedUser = await UsersApi.updateUser(userId, newData);
        if (updatedUser) {
          setUser(updatedUser as User);
        }
      } catch (err) {
        console.log('Error-updateUser', err);
      }
    },
    [userId],
  );

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return {
    user,
    updateUser,
  };
};
