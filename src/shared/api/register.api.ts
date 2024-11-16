import auth from '@react-native-firebase/auth';

export default class RegisterApi {
  static signInWithPhoneNumber = async (phoneNumber: string) =>
    await auth().signInWithPhoneNumber(phoneNumber);

  static signOut = async () => await auth().signOut();
}
