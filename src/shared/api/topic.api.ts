import {Post, Topic} from '@types';
import firestore, {
  FirebaseFirestoreTypes,
  query,
  where,
  orderBy,
  onSnapshot,
} from '@react-native-firebase/firestore';
import UsersApi from './users.api';

export default class TopicApi {
  static collection = firestore().collection('topics');
  static postsCollection = firestore().collection('posts');

  static addTopic = async (topicData: Topic) =>
    await this.collection.add({...topicData, createdAt: Date.now()});

  static followTopic = async (docId: string, topicData: Topic) =>
    this.collection.doc(docId).update(topicData);

  static updateTopic = async (docId: string, topicData: Topic) =>
    this.collection.doc(docId).update(topicData);

  static getTopic = async (topicId: string) => {
    let result: Topic | FirebaseFirestoreTypes.DocumentData | null = null;

    try {
      const querySnapshot = await TopicApi.collection
        .where('_id', '==', topicId)
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

  static getAllTopics = (
    callback: (topics: Topic[] | null) => void,
  ): (() => void) => {
    const unsubscribe = this.collection.onSnapshot(
      querySnapshot => {
        if (querySnapshot && !querySnapshot.empty) {
          const topics = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              ...data,
              docId: doc.id,
            } as Topic;
          });
          callback(topics);
        } else {
          callback(null);
        }
      },
      error => {
        console.error('[Error-getAllTopics]:', error);
        callback(null);
      },
    );

    return unsubscribe;
  };

  static getTopicPosts = (
    topicId: string,
    callback: (post: Post[] | null) => void,
  ): (() => void) => {
    const q = query(
      this.postsCollection,
      where('topicId', '==', topicId),
      orderBy('createdAt', 'desc'),
    );

    const unsubscribe = q.onSnapshot(
      async (querySnapshot: {empty: any; docs: any[]}) => {
        if (querySnapshot && !querySnapshot.empty) {
          const posts = await Promise.all(
            querySnapshot.docs.map(async doc => {
              const data = doc.data();
              let user = null;
              try {
                user = await UsersApi.getUser(data.userId);
              } catch (error) {
                console.error('[Error-getMyPosts]:', error);
              }

              return {
                ...data,
                docId: doc.id,
                user: user ? user : null,
              } as Post;
            }),
          );
          callback(posts as never);
        } else {
          callback(null);
        }
      },
    );

    return unsubscribe;
  };

  static fetchUsersFollowersToTopic = (
    myUid: string,
    callback: (users: Topic[] | null) => void,
  ) => {
    try {
      // Real-time listener
      const unsubscribe = this.collection // Users collection
        .where('followerIds', 'array-contains', myUid) // followerIds array ichida myUid ni qidirish
        .onSnapshot(snapshot => {
          const topics = snapshot.docs.map(doc => ({
            ...doc.data(),
            docId: doc.id,
          })) as Topic[];

          // Callback orqali userlarni qaytarish
          callback(topics);
        });

      // Listenerni to'xtatish uchun unsubscribe funksiyasini qaytarish
      return unsubscribe;
    } catch (error) {
      console.error('Error fetching users following me:', error);
    }
  };
}
