import firestore from '@react-native-firebase/firestore';

interface Interest {
  name: string;
  img: string;
}

export const FetchInterestsApi = async (): Promise<Interest[]> => {
  try {
    const documentSnapshot = await firestore()
      .collection('settings')
      .doc('9crvqYp9NghRwyIZCjm4')
      .get();

    if (documentSnapshot.exists) {
      const data = documentSnapshot.data();
      return data?.data?.interests || [];
    } else {
      console.log('Document does not exist!');
      return [];
    }
  } catch (error) {
    console.error('Error fetching interests:', error);
    return [];
  }
};
