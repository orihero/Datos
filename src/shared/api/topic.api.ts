import {Topic} from '@types';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export default class TopicApi {
  static collection = firestore().collection('topics');

  static addTopic = async (topicData: Topic) =>
    await this.collection.add({...topicData, createAt: Date.now()});

  static followTopic = async (docId: string, topicData: Topic) =>
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
}
