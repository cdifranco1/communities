export interface Reply {
  content: string;
  likes: number;
}

export interface Comment {
  content: string;
  likes: number;
  replies: Array<Reply>;
}

export interface TopicData {
  id: number;
  title: string;
  longText: string;
  views: number;
  likes: number;
  replies: number;
  activity: number;
  comments: Array<Comment>;
}
