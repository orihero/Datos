import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {User} from '@types';

export default class UsersApi {
  static collection = firestore().collection('users');
  static rates = firestore().collection('rates');

  static addUser = async (userData: User) =>
    await this.collection.add({...userData, createdAt: Date.now()});

  static updateUser = async (userId: string, userData: Partial<User>) =>
    this.collection.doc(userId).update(userData);

  static deleteUser = async (userId: string) =>
    this.collection.doc(userId).delete();

  static getUser = async (userId: string) => {
    let result: User | FirebaseFirestoreTypes.DocumentData | null = null;

    try {
      const querySnapshot = await UsersApi.collection
        .where('uid', '==', userId)
        .get();
      if (querySnapshot && !querySnapshot.empty) {
        result = querySnapshot.docs[0].data();
        result = {...result, docId: querySnapshot.docs[0].id};
      }
    } catch (err) {
      console.log('[Error-getUser]:', err);
    }

    return result;
  };

  static getRate = async (level: number) => {
    let result: User | FirebaseFirestoreTypes.DocumentData | null = null;

    try {
      const querySnapshot = await UsersApi.rates
        .where('level', '==', level)
        .get();
      if (querySnapshot && !querySnapshot.empty) {
        result = querySnapshot.docs[0].data();
        result = {...result};
      }
    } catch (err) {
      console.log('[Error-getUser]:', err);
    }

    return result;
  };

  static getAllUsers = (
    callback: (users: User[] | null) => void,
  ): (() => void) => {
    const unsubscribe = this.collection.onSnapshot(
      querySnapshot => {
        if (querySnapshot && !querySnapshot.empty) {
          const users = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              ...data,
              docId: doc.id,
            } as User;
          });
          callback(users);
        } else {
          callback(null);
        }
      },
      error => {
        console.error('[Error-getAllusers]:', error);
        callback(null);
      },
    );

    return unsubscribe;
  };

  static fetchUsersByFollowerIdsWithSnapshot = (
    followerIds: string[],
    callback: (users: User[] | null) => void,
  ) => {
    try {
      if (followerIds.length === 0) {
        return;
      } // followerIds bo'sh bo'lsa, hech narsa qilmaymiz

      // Real-time listener qo'shamiz
      const unsubscribe = this.collection // Users collection
        .where('uid', 'in', followerIds) // followerIds dagi IDlarni qidirish
        .onSnapshot(snapshot => {
          const users = snapshot.docs.map(doc => ({
            ...doc.data(),
            docId: doc.id,
          })) as User[];

          // Callback funksiyasiga users ni qaytarish
          callback(users);
        });

      // Listenerni to'xtatish uchun unsubscribe funksiyasini qaytaramiz
      return unsubscribe;
    } catch (error) {
      console.error('Error fetching users by IDs with snapshot:', error);
    }
  };

  static fetchUsersFollowingMe = (
    myUid: string,
    callback: (users: User[] | null) => void,
  ) => {
    try {
      // Real-time listener
      const unsubscribe = this.collection // Users collection
        .where('followerIds', 'array-contains', myUid) // followerIds array ichida myUid ni qidirish
        .onSnapshot(snapshot => {
          const users = snapshot.docs.map(doc => ({
            ...doc.data(),
            docId: doc.id,
          })) as User[];

          // Callback orqali userlarni qaytarish
          callback(users);
        });

      // Listenerni to'xtatish uchun unsubscribe funksiyasini qaytarish
      return unsubscribe;
    } catch (error) {
      console.error('Error fetching users following me:', error);
    }
  };
}
