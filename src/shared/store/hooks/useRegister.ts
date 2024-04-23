import {useRootStore} from './useRootStore';

export const useRegister = () => {
  const store = useRootStore();
  return store.register;
};
