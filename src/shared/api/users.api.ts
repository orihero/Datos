import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {User} from '@types';

export default class UsersApi {
  static collection = firestore().collection('users');

  static addUser = async (userData: User) =>
    await this.collection.add({...userData, createAt: Date.now()});

  static updateUser = async (userId: string, userData: Partial<User>) =>
    this.collection.doc(userId).update(userData);

  static deleteUser = async (userId: string) =>
    this.collection.doc(userId).delete();

  static getUser = async (userId: string) => {
    let result: FirebaseFirestoreTypes.DocumentData | null = null;

    try {
      const querySnapshot = await UsersApi.collection
        .where('_id', '==', userId)
        .get();
      if (querySnapshot && !querySnapshot.empty && querySnapshot.size === 1) {
        result = querySnapshot.docs[0].data();
      }
    } catch (err) {
      console.log('[Error-getUser]:', err);
    }

    return result;
  };
}
