import firestore, {
  FirebaseFirestoreTypes,
  query,
  where,
  orderBy,
  getDocs,
} from '@react-native-firebase/firestore';
import {Post, AnswerType, CommentType, ReportType} from '@types';
import TopicApi from './topic.api';
import UsersApi from './users.api';

export default class PostsApi {
  static collection = firestore().collection('posts');
  static answer = firestore().collection('answer');
  static comment = firestore().collection('comment');
  static reports = firestore().collection('reports');

  static addPost = async (postData: Post) =>
    await this.collection.add(postData);

  static updateViewPost = async (docId: string, postData: Partial<Post>) =>
    this.collection.doc(docId).update(postData);

  static getPost = async (postId: string) => {
    let result: Post | FirebaseFirestoreTypes.DocumentData | null = null;

    try {
      const querySnapshot = await this.collection
        .where('_id', '==', postId)
        .get();
      if (querySnapshot && !querySnapshot.empty) {
        result = querySnapshot.docs[0].data();
        const topicData = await TopicApi.getTopic(result.topic);
        result = {...result, docId: querySnapshot.docs[0].id, topic: topicData};
      }
    } catch (err) {
      console.log('[Error-getPost]:', err);
    }

    return result;
  };

  static getMyPosts = (
    userId: string,
    callback: (posts: Post[] | null) => void,
  ): (() => void) => {
    const q = query(
      this.collection,
      orderBy('createdAt', 'desc'),
      where('userId', '==', userId),
    );

    const unsubscribe = q.onSnapshot(
      async (querySnapshot: {empty: any; docs: any[]}) => {
        if (querySnapshot && !querySnapshot.empty) {
          const posts = await Promise.all(
            querySnapshot.docs.map(async doc => {
              const data = doc.data();
              let topic = null;

              try {
                topic = await TopicApi.getTopic(data.topicId);
              } catch (error) {
                console.error('[Error-getMyPosts]:', error);
              }

              return {
                ...data,
                docId: doc.id,
                topic: topic ? topic : null,
              } as Post;
            }),
          );
          callback(posts);
        } else {
          callback(null);
        }
      },
    );

    return unsubscribe;
  };

  static getMyAnswers = (
    userId: string,
    callback: (answers: AnswerType[] | null) => void,
  ): (() => void) => {
    const q = query(
      this.answer,
      orderBy('createdAt', 'desc'),
      where('userId', '==', userId),
    );

    const unsubscribe = q.onSnapshot(
      async (querySnapshot: {empty: any; docs: any[]}) => {
        if (querySnapshot && !querySnapshot.empty) {
          const answers = await Promise.all(
            querySnapshot.docs.map(async doc => {
              const data = doc.data();
              let userData = null;

              try {
                userData = await UsersApi.getUser(data.userId);
              } catch (error) {
                console.error('[Error-getPostAnswers]:', error);
              }

              return {
                ...data,
                docId: doc.id,
                user: userData ? userData : null,
              } as AnswerType;
            }),
          );
          callback(answers);
        } else {
          callback(null);
        }
      },
    );

    return unsubscribe;
  };

  static getAllPosts = async (): Promise<Post[] | null> => {
    try {
      const q = query(this.collection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const posts = await Promise.all(
          querySnapshot.docs.map(async (doc: any) => {
            const data = doc.data();
            let topicData = null;
            let userData = null;

            try {
              topicData = await TopicApi.getTopic(data.topicId);
              userData = await UsersApi.getUser(data.userId);
            } catch (error) {
              console.error('[Error-getTopic]:', error);
            }

            return {
              ...data,
              docId: doc.id,
              topic: topicData ? topicData : null,
              user: userData ? userData : null,
            };
          }),
        );

        return posts;
      } else {
        return null;
      }
    } catch (error) {
      console.error('[Error-getAllPosts]:', error);
      return null;
    }
  };

  static getUserFollowedTopicsPosts = async (
    userId: string,
  ): Promise<Post[] | null> => {
    try {
      const q = query(this.collection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const posts = await Promise.all(
          querySnapshot.docs.map(async (doc: any) => {
            const data = doc.data();
            let topicData = null;
            let userData = null;

            try {
              // Topic ma'lumotlarini olish
              topicData = await TopicApi.getTopic(data.topicId);

              // Faqat followerIds ichida userId bor bo'lsa postni qo'shamiz
              if (
                topicData?.followerIds &&
                topicData.followerIds.includes(userId)
              ) {
                userData = await UsersApi.getUser(data.userId);
                return {
                  ...data,
                  docId: doc.id,
                  topic: topicData,
                  user: userData,
                };
              }
            } catch (error) {
              console.error('[Error-getTopic]:', error);
            }

            return null; // Agar followerIds ichida userId bo'lmasa, null qaytaradi
          }),
        );

        // Faqat null bo'lmagan postlarni qaytarish
        return posts.filter((post: any) => post !== null) as Post[];
      } else {
        return null;
      }
    } catch (error) {
      console.error('[Error-getUserPosts]:', error);
      return null;
    }
  };

  //answers

  static addAnswer = async (answerData: AnswerType) => {
    await this.answer.add(answerData);
  };

  static getPostAnswers = (
    postId: string,
    callback: (answers: AnswerType[] | null) => void,
  ): (() => void) => {
    const q = query(
      this.answer,
      orderBy('createdAt', 'desc'),
      where('postId', '==', postId),
    );

    const unsubscribe = q.onSnapshot(
      async (querySnapshot: {empty: any; docs: any[]}) => {
        if (querySnapshot && !querySnapshot.empty) {
          const answers = await Promise.all(
            querySnapshot.docs.map(async doc => {
              const data = doc.data();
              let userData = null;
              let comments = null;

              try {
                userData = await UsersApi.getUser(data.userId);

                comments = await this.getCommentsForAnswer(data._id);
              } catch (error) {
                console.error('[Error-getPostAnswers]:', error);
              }

              return {
                ...data,
                docId: doc.id,
                user: userData ? userData : null,
                comments: comments ? comments : [],
              } as AnswerType;
            }),
          );
          callback(answers);
        } else {
          callback(null);
        }
      },
    );

    return unsubscribe;
  };

  static updatePostAnswer = async (
    docId: string,
    answerData: Partial<AnswerType>,
  ) => this.answer.doc(docId).update(answerData);

  //comments

  static addCommnetToAnswer = async (commentData: CommentType) => {
    await this.comment.add(commentData);
  };

  static addCommnetToPost = async (commentData: CommentType) => {
    await this.comment.add(commentData);
  };

  static getPostComments = (
    id: string,
    callback: (comments: AnswerType[] | null) => void,
  ): (() => void) => {
    const q = query(
      this.comment,
      orderBy('createdAt', 'desc'),
      where('answerId', '==', id),
    );

    const unsubscribe = q.onSnapshot(
      async (querySnapshot: {empty: any; docs: any[]}) => {
        console.log(
          'Snapshot received:',
          querySnapshot?.docs.map(doc => doc.data()),
        );
        if (querySnapshot && !querySnapshot.empty) {
          const comments = await Promise.all(
            querySnapshot.docs.map(async doc => {
              const data = doc.data();
              let userData = null;

              try {
                userData = await UsersApi.getUser(data.userId);
              } catch (error) {
                console.error('[Error-getPostcomments]:', error);
              }

              return {
                ...data,
                docId: doc.id,
                user: userData ? userData : null,
              } as AnswerType;
            }),
          );
          callback(comments);
        } else {
          callback(null);
        }
      },
    );

    return unsubscribe;
  };

  static getCommentsForAnswer = async (
    id: string,
  ): Promise<CommentType[] | null> => {
    try {
      const querySnapshot = await this.comment
        .where('answerId', '==', id)
        // .orderBy('createdAt', 'desc')
        .get();

      if (!querySnapshot.empty) {
        const comments = await Promise.all(
          querySnapshot.docs.map(async doc => {
            const data = doc.data();

            let userData = null;

            try {
              userData = await UsersApi.getUser(data.userId);
            } catch (error) {
              console.error('[Error-getUser]:', error);
            }

            return {
              ...data,
              docId: doc.id,
              user: userData ? userData : null,
            } as unknown as CommentType;
          }),
        );
        return comments;
      }
      return null;
    } catch (error) {
      console.error('[Error-getCommentsForAnswer]:', error);
      return null;
    }
  };

  //reports
  static addReport = async (reportData: ReportType) => {
    await this.reports.add(reportData);
  };
}
