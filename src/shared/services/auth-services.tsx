import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useMemo,
  PropsWithChildren,
} from 'react';

type AuthContextType = ReturnType<typeof useModule>;
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export interface AuthState {
  phone: {
    number: string;
    code: string;
    confirm: FirebaseAuthTypes.ConfirmationResult;
  };
}
const useModule = () => {
  const [state, setState] = useState<AuthState>({
    phone: {
      code: '',
      confirm: {},
      number: '',
    },
  } as AuthState);

  // actions
  const onChangePhone = useCallback((number: string) => {
    setState(prevState => ({
      ...prevState,
      phone: {...prevState.phone, number},
    }));
  }, []);

  const onChangeCode = useCallback((code: string) => {
    setState(prevState => ({
      ...prevState,
      phone: {...prevState.phone, code},
    }));
  }, []);

  const onChangeConfirmation = useCallback(
    (confirm: AuthState['phone']['confirm']) => {
      setState(prevState => ({
        ...prevState,
        phone: {...prevState.phone, confirm},
      }));
    },
    [],
  );

  const actions = useMemo(
    () => ({
      onChangePhone,
      onChangeCode,
      onChangeConfirmation,
    }),
    [onChangeCode, onChangeConfirmation, onChangePhone],
  );

  // auth
  // confirm
  const signInWithPhoneConfirm = useCallback(async () => {
    if (!state.phone.confirm.confirm) {
      return;
    }
    try {
      const userCredential = await state.phone.confirm.confirm(
        state.phone.code,
      );
      const user = userCredential?.user;

      // Check if the user is new or existing
      const userDocument = await firestore()
        .collection('users')
        .doc(user?.uid)
        .get();

      // User is existing, navigate to home screen
      if (userDocument.exists) {
      } else {
        // User is new
        await firestore().collection('users').doc(user?.uid).set({
          name: 'Abdurakhmon',
          phone: state.phone.number,
          gender: 'male',
        });
      }
    } catch (err) {
      console.log('[Error-signInWithPhoneConfirm]:', err);
    }
  }, [state.phone]);

  // authentication with phone number
  const signInWithPhoneNumber = useCallback(async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        state.phone.number,
      );
      actions.onChangeConfirmation(confirmation);
    } catch (err) {
      console.log('[Error-onSignInWithPhoneNumber]:', err);
    }
  }, [actions, state.phone.number]);

  return {
    state,
    actions,
    signInWithPhoneNumber,
    signInWithPhoneConfirm,
  };
};

const AuthProvider = ({children}: PropsWithChildren) => {
  const value = useModule();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth};
