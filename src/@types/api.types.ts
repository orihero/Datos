export type User = {
  _id: string;
  createAt: number;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  userImageUrl: string;
  docId: string;
};

export const UserInitial: User = {
  _id: '',
  createAt: 0,
  email: '',
  firstName: '',
  lastName: '',
  nickname: '',
  userImageUrl: '',
  docId: '',
};

export type Post = {
  _id: string;
  createAt: number;
  userId: number;
  type: string;
  title: string;
  body: string;
  images: string[];
};

export const PostInitial: Post = {
  _id: '',
  createAt: 0,
  userId: 0,
  type: '',
  title: '',
  body: '',
  images: [],
};

export type Topic = {
  _id: string;
  createAt: number;
  userId: number;
  title: string;
  description: string;
  avatar: string;
};

export const TopicInitial: Topic = {
  _id: '',
  createAt: 0,
  userId: 0,
  title: '',
  description: '',
  avatar: '',
};
