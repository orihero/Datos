import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default class RegisterApi {
  static signInWithPhoneNumber = async (phoneNumber: string) =>
    await auth().signInWithPhoneNumber(phoneNumber);

  static signInWithGoogle = async () => {
    try {
      const {data} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(
        data?.idToken as never,
      );

      return await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Google Sign-In xatolik:', error);
      throw error;
    }
  };

  static signOut = async () => await auth().signOut();
}
