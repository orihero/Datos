import {
  createNavigationContainerRef,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';

export default class NavigationService {
  static ref: NavigationContainerRefWithCurrent<any> =
    createNavigationContainerRef<any>();
  static navigate = (
    name: any,
    params?: {[key: string]: string | number | undefined},
  ) => {
    if (this.ref.isReady()) {
      this.ref.navigate(name, params);
    }
  };
  static goBack = () => {
    if (this.ref.isReady()) {
      this.ref.goBack();
    }
  };
}
