import {makeAutoObservable} from 'mobx';
import {ICountry} from 'react-native-international-phone-number';
import RootStore from './RootStore';
import RegisterApi from 'shared/api/register.api';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Loading from 'shared/utils/Loading';
import NavigationService from 'shared/navigation/NavigationService';
import {REGISTER_STACK} from 'shared/navigation/routes';
import UsersApi from 'shared/api/users.api';

export interface RegisterStoreState {
  login: {
    country: ICountry | null;
    input: string;
  };
  confirmCode: {
    code: string;
  };
  setup: {
    firstName: string;
    lastName: string;
    neckname: string;
    userImageUrl: string | null;
    gender: 'male' | 'female';
  };
}

const initialState: RegisterStoreState = {
  login: {
    country: null,
    input: '',
  },
  confirmCode: {
    code: '',
  },
  setup: {
    firstName: '',
    lastName: '',
    neckname: '',
    userImageUrl: null,
    gender: 'male',
  },
};

export default class RegisterStore {
  state: RegisterStoreState = initialState;
  private confirmResult: FirebaseAuthTypes.ConfirmationResult | null = null;
  loadingWhenLogIn: Loading = new Loading();
  loadingWhenConfirm: Loading = new Loading();

  // Root Store
  private readonly rootStore: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.rootStore = root;
  }

  onChangeOfLogin = <T extends keyof RegisterStoreState['login']>(
    key: T,
    value: RegisterStoreState['login'][T],
  ) => {
    this.state = {
      ...this.state,
      login: {
        ...this.state.login,
        [key]: value,
      },
    };
  };

  onChangeCodeOfConfirm = (code: string) =>
    (this.state = {
      ...this.state,
      confirmCode: {...this.state.confirmCode, code},
    });

  onChangeOfSetup = <T extends keyof RegisterStoreState['setup']>(
    key: T,
    value: RegisterStoreState['setup'][T],
  ) => {
    this.state = {
      ...this.state,
      setup: {
        ...this.state.setup,
        [key]: value,
      },
    };
  };

  private get phoneNumber(): string {
    const {country, input} = this.state.login;
    const regex = new RegExp(/\s/g);
    return country?.callingCode + input.replace(regex, '');
  }

  onLoginWithPhone = async () => {
    if (!this.phoneNumber) {
      console.log([
        '[Warning-onLoginWithPhone]:',
        'It is important to enter the phoneNumber!',
      ]);
      return;
    }

    this.loadingWhenLogIn.show();
    try {
      this.confirmResult = await RegisterApi.signInWithPhoneNumber(
        this.phoneNumber,
      );
      setTimeout(() => {
        this.loadingWhenLogIn.hide();
        NavigationService.navigate(REGISTER_STACK.CONFIRM);
      }, 400);
    } catch (err) {
      console.log(['[Error-onLoginWithPhone]:', err]);
    } finally {
      setTimeout(() => this.loadingWhenLogIn.hide, 2000);
    }
  };

  onLoginWithPhoneConfirm = async () => {
    const {code} = this.state.confirmCode;

    if (!this.confirmResult) {
      console.log([
        '[Warning-onLoginWithPhoneConfirm]:',
        'It is important to enter the confirmResult!',
      ]);
      return;
    }

    if (!code) {
      console.log([
        '[Warning-onLoginWithPhoneConfirm]:',
        'It is important to enter the code!',
      ]);
      return;
    }
    try {
      this.loadingWhenConfirm.show();
      const userCredential = await this.confirmResult.confirm(code);
      const user = userCredential?.user;

      if (!user) {
        return;
      }

      // Check if the user is new or existing
      const userDocument = await UsersApi.collection.doc(user.uid).get();

      if (userDocument.exists) {
        // the user is existed || navigate to HomeScreen
      } else {
        // the user is new || navigate to SetupScreen
        setTimeout(() => {
          console.log({user});
          this.loadingWhenConfirm.hide();
          NavigationService.navigate(REGISTER_STACK.SET_UP, {uid: user.uid});
        }, 400);
      }
    } catch (err) {
      console.log(['[Error-onLoginWithPhoneConfirm]', err]);
    } finally {
      setTimeout(() => this.loadingWhenConfirm.hide, 2000);
    }
  };

  onSetUpFinish = async (_id: string) => {
    const newUser = {
      ...this.state.setup,
      _id,
    };
    try {
      await UsersApi.addUser(newUser);
      console.log('new user is created.!');
    } catch (err) {
      console.log(['[Error-onSetUpFinish]:', err]);
    }
  };
}
