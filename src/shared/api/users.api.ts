import firestore from '@react-native-firebase/firestore';
import {User} from '@types';

export default class UsersApi {
  static collection = firestore().collection('users');

  static addUser = async (userData: User) =>
    await this.collection.add(userData);

  static updateUser = async (userId: string, userData: Partial<User>) =>
    this.collection.doc(userId).update(userData);

  static deleteUser = async (userId: string) =>
    this.collection.doc(userId).delete();
}
