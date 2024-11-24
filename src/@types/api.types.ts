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

export type PollOptionType = {
  id: string;
  text: string;
  votesCount: number;
};
export const PollOptionInitial = [
  {
    id: '1',
    text: '',
    votesCount: 0,
  },
  {
    id: '2',
    text: '',
    votesCount: 0,
  },
];

export type Post = {
  _id: string;
  createAt: number;
  userId: string;
  type: string;
  title: string;
  body: string;
  images: string[];
  topics: Topic[];
  pollOptions: PollOptionType[];
  pollEndDays: number;
};

export const PostInitial: Post = {
  _id: '',
  createAt: 0,
  userId: '',
  type: 'Question',
  title: '',
  body: '',
  images: [],
  topics: [],
  pollOptions: PollOptionInitial,
  pollEndDays: 3,
};

export type Topic = {
  _id: string;
  createAt: number;
  userId: string;
  title: string;
  description: string;
  avatar: string;
  followerIds: string[];
  docId: string;
};

export const TopicInitial: Topic = {
  _id: '',
  createAt: 0,
  userId: '',
  title: '',
  description: '',
  avatar: '',
  followerIds: [],
  docId: '',
};
