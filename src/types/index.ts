export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface Comment {
  _id: string;
  content: string;
  author: User;
  createdAt: string;
}
