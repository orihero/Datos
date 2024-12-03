import {makeAutoObservable} from 'mobx';
import {ICountry} from 'react-native-international-phone-number';
import RootStore from './RootStore';
import RegisterApi from 'shared/api/register.api';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Loading from 'shared/utils/Loading';
import NavigationService from 'shared/navigation/NavigationService';
import {REGISTER_STACK, ROOT_STACK} from 'shared/navigation/routes';
import UsersApi from 'shared/api/users.api';
import {Alert} from 'react-native';
import {nanoid} from 'nanoid/non-secure';

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
    nickname: string;
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
    nickname: '',
    userImageUrl: null,
    gender: 'male',
  },
};

export default class RegisterStore {
  state: RegisterStoreState = initialState;
  private confirmResult: FirebaseAuthTypes.ConfirmationResult | null = null;
  loadingWhenLogIn: Loading = new Loading();
  loadingWhenGoogleLogIn: Loading = new Loading();
  loadingWhenConfirm: Loading = new Loading();
  loadingWhenOnFinish: Loading = new Loading();

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
      Alert.alert(`${err}`);
      this.loadingWhenLogIn.hide();
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
      const currentUser = await UsersApi.getUser(user.uid);
      if (currentUser) {
        // it's not good solution, need to improve it
        // the user is existed || navigate to HomeScreen
        NavigationService.navigate(ROOT_STACK.HOME);
        this.rootStore.local.setUserId(user.uid);
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
      this.loadingWhenOnFinish.show();
      await UsersApi.addUser(newUser as never);
      this.rootStore.local.setUserId(_id);
      setTimeout(() => {
        NavigationService.navigate(ROOT_STACK.HOME);
        this.loadingWhenOnFinish.hide();
      }, 400);
    } catch (err) {
      console.log(['[Error-onSetUpFinish]:', err]);
    } finally {
      setTimeout(() => this.loadingWhenOnFinish.hide, 2000);
    }
  };

  onSignInWithGoogle = async () => {
    try {
      this.loadingWhenGoogleLogIn.show();
      const res = await RegisterApi.signInWithGoogle();
      const newUser = {
        _id: nanoid(10),
        uid: res.user.uid,
        createdAt: Date.now(),
        email: res.user.email,
        firstName: res.additionalUserInfo?.profile?.given_name,
        lastName: res.additionalUserInfo?.profile?.family_name,
        nickname: res.additionalUserInfo?.profile?.name.split(' ').join(''),
        userImageUrl: res.additionalUserInfo?.profile?.picture,
        interest: this.rootStore.local.selectedInterest,
      };
      const isHasUser = await UsersApi.getUser(newUser._id);
      if (isHasUser === null) {
        await UsersApi.addUser(newUser as never);
      }
      this.rootStore.local.setUserId(newUser._id);
      setTimeout(() => {
        NavigationService.navigate(ROOT_STACK.HOME);
        this.loadingWhenGoogleLogIn.hide();
      }, 400);
    } catch (err) {
      console.log(['[Error-onSignInWithGoogle]:', err]);
    } finally {
      setTimeout(() => this.loadingWhenGoogleLogIn.hide, 2000);
    }
  };

  onSignOut = async () => {
    try {
      await RegisterApi.signOut();
      this.rootStore.local.clearUserId();
      setTimeout(() => {
        NavigationService.navigate(ROOT_STACK.ONBOARDING);
        this.loadingWhenGoogleLogIn.hide();
      }, 400);
    } catch (err) {
      console.log(['[Error-onSignOut]:', err]);
    }
  };
}
