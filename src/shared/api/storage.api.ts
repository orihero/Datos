import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import type {Asset} from 'react-native-image-picker';

export default class StorageApi {
  static uploadImage = async ({
    file,
  }: {
    file: Asset;
  }): Promise<string | null> => {
    try {
      const res = await storage()
        .ref(`topicAvatars/${file.fileName}.${file.fileName?.split('/')[1]}`)
        .putFile(file.uri as never);

      return await getUrlFromStorage(res);
    } catch (error) {
      console.log(['[Error-uploadImage]:', error]);
      return null;
    }
  };
}

export const getUrlFromStorage = async (
  data: FirebaseStorageTypes.TaskSnapshot,
): Promise<string | null> => {
  try {
    const reference = storage().ref(data.metadata.fullPath);
    const url = await reference.getDownloadURL();
    return url;
  } catch (err) {
    console.log(['[Error-getUrlFromStorage]:', err]);
    return null;
  }
};
