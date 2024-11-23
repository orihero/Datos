import {Topic} from '@types';
import firestore from '@react-native-firebase/firestore';

export default class TopicApi {
  static collection = firestore().collection('topics');

  static addTopic = async (topicData: Topic) =>
    await this.collection.add({...topicData, createAt: Date.now()});
}
