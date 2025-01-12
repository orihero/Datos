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

  static uploadImageTwo = async ({file}) => {
    if (!file) {
      throw new Error('No file to upload');
    }

    const filePath = file.uri || file.path; // Fayl yo'lini olish
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1); // Fayl nomini ajratib olish
    const reference = storage().ref(`/images/${fileName}`); // Firebase Storage yo'li

    const uploadTask = await reference.putFile(filePath); // Faylni yuklash

    const downloadUrl = await reference.getDownloadURL(); // Yuklangan fayl uchun URL
    return downloadUrl;
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
