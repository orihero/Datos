export type User = {
  _id: string;
  uid: string;
  createdAt: number;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  userImageUrl: string;
  gender: string;
  docId: string;
  followerIds: string[];
  interests: string[];
  postsIds: string[];
  answersIds: string[];
  points: number;
  level: {
    level: number;
    upOrDownVote: number;
    period: number;
    createdAt: number;
  };
  usedVotes: number;
};

export const UserInitial: User = {
  _id: '',
  uid: '',
  createdAt: 0,
  email: '',
  firstName: '',
  lastName: '',
  nickname: '',
  userImageUrl: '',
  gender: '',
  docId: '',
  followerIds: [],
  interests: [],
  postsIds: [],
  answersIds: [],
  points: 0,
  level: {
    level: 0,
    upOrDownVote: 0,
    period: 0,
    createdAt: 0,
  },
  usedVotes: 0,
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
  rate: number;
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
  commentsCount: number;
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
  rate: 0,
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
  commentsCount: 0,
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
  category: string;
  postIds: string[];
};

export type SortType = {
  byDate: boolean;
  byVotes: boolean;
  byViews: boolean;
  bycomments: boolean;
  byFollowers: boolean;
};
export const SortTypeInitial = {
  byDate: false,
  byVotes: false,
  byViews: false,
  bycomments: false,
  byFollowers: false,
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
  category: '',
  postIds: [],
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

export type InterestType = {
  img: string;
  name: string;
};

export const InterestInitial = {
  img: '',
  name: '',
};

export type ReportType = {
  id: string;
  postId: string;
  userId: string;
  createdAt: number;
  message: string;
};

export const ReportInitial = {
  id: '',
  postId: '',
  userId: '',
  createdAt: 0,
  message: '',
};
