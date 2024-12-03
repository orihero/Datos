export type User = {
  _id: string;
  createdAt: number;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  userImageUrl: string;
  docId: string;
  followerIds: string[];
  interests: string[];
};

export const UserInitial: User = {
  _id: '',
  createdAt: 0,
  email: '',
  firstName: '',
  lastName: '',
  nickname: '',
  userImageUrl: '',
  docId: '',
  followerIds: [],
  interests: [],
};

export type PollOptionType = {
  id: string;
  text: string;
  votesCount: number;
  votedUserIds: string[];
};
export const PollOptionInitial = [
  {
    id: '1',
    text: '',
    votesCount: 0,
    votedUserIds: [],
  },
  {
    id: '2',
    text: '',
    votesCount: 0,
    votedUserIds: [],
  },
];

export type Post = {
  _id: string;
  docId: string;
  userId: string;
  topicId: string;
  createdAt: number;
  type: string;
  title: string;
  body: string;
  media: string;
  mediaType: string;
  topic: Topic;
  user: User;
  comments: CommentType[];
  pollOptions: PollOptionType[];
  pollEndDays: number;
  pollVotedUserIds: string[];
  votesCount: number;
  status: string;
  answersCount: number;
  comentsCount: number;
  anwerUserIds: string[];
  commentUserIds: string[];
  viewUserIds: string[];
  upVoteUserIds: string[];
  downVoteUserIds: string[];
};

export const PostInitial: Post = {
  _id: '',
  createdAt: 0,
  userId: '',
  docId: '',
  topicId: '',
  type: 'Question',
  title: '',
  body: '',
  media: '',
  mediaType: '',
  topic: {} as never,
  user: {} as never,
  comments: [] as never,
  pollOptions: PollOptionInitial,
  pollEndDays: 3,
  pollVotedUserIds: [],
  votesCount: 0,
  status: 'PENDING',
  answersCount: 0,
  comentsCount: 0,
  viewUserIds: [],
  anwerUserIds: [],
  commentUserIds: [],
  upVoteUserIds: [],
  downVoteUserIds: [],
};

export type Topic = {
  _id: string;
  createdAt: number;
  userId: string;
  title: string;
  description: string;
  avatar: string;
  followerIds: string[];
  docId: string;
};

export const TopicInitial: Topic = {
  _id: '',
  createdAt: 0,
  userId: '',
  title: '',
  description: '',
  avatar: '',
  followerIds: [],
  docId: '',
};

export type AnswerType = {
  _id: string;
  userId: string;
  postId: string;
  docId: string;
  createdAt: number;
  type: string;
  title: string;
  votesCount: number;
  user: User;
  isCorrect: boolean;
  comments: CommentType[];
  upVoteUserIds: string[];
  downVoteUserIds: string[];
};

export const AnswerInitial: AnswerType = {
  _id: '',
  postId: '',
  userId: '',
  docId: '',
  createdAt: 0,
  type: 'answer',
  isCorrect: false,
  user: {} as never,
  comments: [],
  title: '',
  votesCount: 0,
  downVoteUserIds: [],
  upVoteUserIds: [],
};

export type CommentType = {
  _id: string;
  userId: string;
  postId: string;
  answerId: string;
  createdAt: number;
  type: string;
  title: string;
  user: User;
  isCommentForAnswer: boolean;
};

export const CommentInitial: CommentType = {
  _id: '',
  postId: '',
  userId: '',
  answerId: '',
  createdAt: 0,
  type: 'answer',
  title: '',
  user: {} as never,
  isCommentForAnswer: false,
};
