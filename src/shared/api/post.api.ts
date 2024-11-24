import firestore from '@react-native-firebase/firestore';
import {Post} from '@types';

export default class PostsApi {
  static collection = firestore().collection('posts');

  static addPost = async (postData: Post) =>
    await this.collection.add({...postData, createAt: Date.now()});
}
