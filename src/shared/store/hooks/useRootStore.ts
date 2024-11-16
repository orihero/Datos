import {createContext, useContext} from 'react';
import RootStore from '../RootStore';

const rootStore = new RootStore();

const rootStoreContext = createContext(rootStore);
export const useRootStore = () => useContext(rootStoreContext);
