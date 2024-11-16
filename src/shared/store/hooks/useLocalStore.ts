import {useRootStore} from './useRootStore';

export const useLocalStore = () => {
  const store = useRootStore();
  return store.local;
};
